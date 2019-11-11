const Path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const { extractFileName } = require('./util');
const { name } = require('../package.json');

function Structurize(bundler) {
    if (process.env.NODE_ENV === 'production') {
        const defaultConfig = require('./default.structure.json');
        const { [name]: packageConfig } = require(Path.resolve(
            './package.json'
        ));

        if (packageConfig !== false) {
            const {
                options: { outDir: DIST_PATH, publicURL }
            } = bundler;
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
                const markupFiles = [...bundler.bundleNameMap]
                    .filter(file => /\.html$/.test(file[1]))
                    .map(file => extractFileName(file[1]));

                const markups = markupFiles.map(
                    file =>
                        new JSDOM(
                            fs.readFileSync(Path.resolve(DIST_PATH, file))
                        ).window.document
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
                        Path.resolve(DIST_PATH, file),
                        markups[index].documentElement.outerHTML
                    );
                });
            });
        }
    }
}

module.exports = Structurize;
