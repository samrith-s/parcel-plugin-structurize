import Path from 'path';
import fs from 'fs';
import move from 'glob-move';
import chalk from 'chalk';

import { isRemote } from '../util';

export default function({ dist, origin, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;
        const path = Path.join(prefix, folder);

        move(Path.join(dist, match), Path.join(dist, folder))
            .then(async () => {
                await markups.forEach(async document => {
                    const allScripts = document.querySelectorAll('script[src]');

                    await allScripts.forEach(async script => {
                        if (isRemote(script.src, origin + prefix)) return;

                        const oldFilePath = script.src;
                        const fileName = Path.basename(oldFilePath);
                        const scriptPath = Path.join(dist, folder, fileName);

                        script.src = origin + Path.join('/', path, fileName);

                        try {
                            let content: any = await fs.readFileSync(scriptPath);
                            content = content.toString().replace(oldFilePath, script.src);

                            return fs.writeFileSync(scriptPath, content);
                        } catch (e) {
                            throw e;
                        }
                    });
                });

                resolve();
            })
            .catch(e => {
                // eslint-disable-next-line no-console
                console.log(chalk.red.bold('Error while structurizing scripts. Please check structures.'));
                // eslint-disable-next-line no-console
                console.log(chalk.gray('Dist path:', dist));
                // eslint-disable-next-line no-console
                console.log(e);
                process.exit();
            });
    });
}
