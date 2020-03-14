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
                    const allScripts = document.querySelectorAll('script[src]');
                    const path = Path.resolve(prefix, folder)

                    await allScripts.forEach(async script => {
                        if (!isNotRemote(script.src)) return

                        const oldFilePath = script.src;
                        const fileName = Path.basename(oldFilePath);
                        const scriptPath = Path.resolve(dist, folder, fileName);

                        script.src = Path.resolve(path, fileName)

                        try {
                            let content = await fs.readFileSync(scriptPath)
                            content = content
                                .toString()
                                .replace(oldFilePath, script.src);

                            return fs.writeFileSync(scriptPath, content)
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
                        'Error while structurizing scripts. Please check structures.'
                    )
                );
                console.log(chalk.gray('Dist path:', dist));
                console.log(e);
                process.exit();
            });
    });
};
