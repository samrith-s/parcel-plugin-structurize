const Path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const { extractFileName } = require('./util');
const { name } = require('../package.json');

function Structurize(bundler) {
    const defaultConfig = require('./default.structure.json');
    const { [name]: packageConfig } = require(Path.resolve(
        './package.json'
    ));
    let shouldRun = false;

    if (packageConfig !== false) {
        // default NODE_ENV could be undefined hence the OR clause, see https://stackoverflow.com/a/31611428
        // checks if NODE_ENV is 'development' and if it is undefined assign it 'development'
        if (packageConfig.mode === 'development' && ((current_NODE_ENV = process.env.NODE_ENV || 'development') === 'development')) {
            shouldRun = true;
            delete packageConfig.mode;
        } else if (((packageConfigMode = packageConfig.mode || 'production') === 'production') && process.env.NODE_ENV === 'production') {
            shouldRun = true;
            delete packageConfig.mode;
        } else if (packageConfig.mode === 'both') {
            shouldRun = true;
            delete packageConfig.mode;
        }
        if (shouldRun) {
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
                const markupFiles = [...bundler.loadedAssets]
                    .filter(file => /\.html$/.test(file[0]))
                    .map(file => extractFileName(file[0]));

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
