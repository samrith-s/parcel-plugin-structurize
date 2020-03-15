const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');

const { isRemote } = require('../util');

module.exports = function({ dist, origin, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;
        const path = Path.join(prefix, folder)

        move(Path.join(dist, match), Path.join(dist, folder))
            .then(async () => {
                await markups.forEach(async document => {
                    const allStyles = document.querySelectorAll(
                        'link[rel="stylesheet"]'
                    );

                    await allStyles.forEach(async style => {
                        if (isRemote(style.href, origin + prefix)) return

                        const oldFilePath = style.href;
                        const fileName = Path.basename(oldFilePath);
                        const stylePath = Path.join(dist, folder, fileName);

                        style.href = origin + Path.join('/', path, fileName)

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
                // eslint-disable-next-line no-console
                console.log(
                    chalk.red.bold(
                        'Error while structurizing styles. Please check structures.'
                    )
                );
                // eslint-disable-next-line no-console
                console.log(chalk.gray('Dist path:', dist));
                // eslint-disable-next-line no-console
                console.log(e);
                process.exit();
            });
    });
};
