const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');

const { isNotRemote } = require('../util');

module.exports = function({ dist, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;

        move(Path.resolve(dist, match), Path.resolve(dist, folder))
            .then(async () => {
                await markups.forEach(async document => {
                    const allStyles = document.querySelectorAll(
                        'link[rel="stylesheet"]'
                    );
                    const path = Path.resolve(prefix, folder)

                    await allStyles.forEach(async style => {
                        if (!isNotRemote(style.href)) return

                        const oldFilePath = style.href;
                        const fileName = Path.basename(oldFilePath);
                        const stylePath = Path.resolve(dist, folder, fileName);

                        style.href = Path.resolve(path, fileName)

                        try {
                            let content = await fs.readFileSync(stylePath);
                            content = content
                                .toString()
                                .replace(oldFilePath, style.href)

                            fs.writeFileSync(stylePath, content)
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
