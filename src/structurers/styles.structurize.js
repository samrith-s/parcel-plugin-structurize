const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');

const { extractFileName } = require('../util');

module.exports = function({ dist, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;

        move(`${dist}/${match}`, `${dist}/${folder}`)
            .then(async () => {
                await markups.forEach(async document => {
                    const allStyles = document.querySelectorAll(
                        'link[rel="stylesheet"]'
                    );

                    const path = `${prefix}/${folder}/`;

                    await allStyles.forEach(async style => {
                        try {
                            const oldFilePath = style.href;
                            const fileName = extractFileName(oldFilePath);
                            const stylePath = Path.join(dist, folder, fileName);
                            const content = await fs
                                .readFileSync(stylePath)
                                .toString();

                            style.href = `${path}${fileName}`;
                            fs.writeFileSync(
                                stylePath,
                                content.replace(oldFilePath, style.href)
                            );
                        } catch (e) {
                            throw e;
                        }
                    });
                });

                resolve();
            })
            .catch(e => {
                console.log(
                    chalk.red.bold(
                        'Error while structurizing styles. Please check structures.'
                    )
                );
                console.log(chalk.gray('Dist path:', dist));
                console.log(e);
                process.exit();
            });
    });
};
