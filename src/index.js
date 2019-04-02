const Path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

function Structurize(bundler) {
    if (process.env.NODE_ENV === 'production') {
        const defaultConfig = require('./default.structure.json');
        const {
            ['parcel-plugin-structurize']: packageConfig
        } = require(Path.resolve('./package.json'));

        if (packageConfig !== false) {
            const {
                options: { outDir, publicURL, entryFiles }
            } = bundler;
            const DIST_PATH = Path.resolve(outDir);
            const config = {
                ...defaultConfig,
                ...packageConfig
            };
            const configEntries = Object.entries(config).sort((a, b) => {
                if (a[0] < b[0]) {
                    return -1;
                }

                if (a[0] > b[0]) {
                    return 1;
                }

                return 0;
            });

            bundler.on('buildEnd', async () => {
                const markupFiles = entryFiles
                    .filter(file => /\.html$/.test(file))
                    .map(file => {
                        return file.split('/').pop();
                    });
                const markups = markupFiles.map(
                    file =>
                        new JSDOM(fs.readFileSync(Path.join(DIST_PATH, file)))
                            .window.document
                );

                for (let [structurer, options] of configEntries) {
                    await require(`./structurers/${structurer}.structurize`)({
                        dist: DIST_PATH,
                        prefix: publicURL.replace(/\/$/, ''),
                        options,
                        markups
                    });
                }

                markupFiles.forEach((file, index) => {
                    fs.writeFileSync(
                        Path.join(DIST_PATH, file),
                        markups[index].documentElement.outerHTML
                    );
                });
            });
        }
    }
}

module.exports = Structurize;
