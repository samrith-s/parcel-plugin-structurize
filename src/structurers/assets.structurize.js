const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');
const rewriteCSSUrls = require('css-url-rewrite');

const { isNotRemote } = require('../util');

module.exports = function({ dist, origin, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;
        const path = Path.join(prefix, folder)

        move(Path.join(dist, match), Path.join(dist, folder))
            .then(() => {
                markups.forEach(async document => {
                    const allAssets = await document.querySelectorAll(
                        `img, source, link[rel*="icon"]`
                    );
                    const allStyles = await document.querySelectorAll(
                        'style, link[rel="stylesheet"]'
                    );

                    await allAssets.forEach(image => {
                        let attrValue = 'src';
                        if (image.tagName === 'SOURCE') attrValue = 'srcset';
                        if (image.tagName === 'LINK') attrValue = 'href';

                        const fileName = Path.basename(image[attrValue])

                        return image[attrValue] = origin + Path.join('/', path, fileName);
                    });

                    await allStyles.forEach(async style => {
                        if (style.tagName === 'STYLE') {
                            style.textContent = rewriteUrls(
                                style.textContent,
                                path
                            );
                            return style.textContent
                        }
                        if (!isNotRemote(style.href)) return

                        const filePath = Path.join(
                            dist,
                            Path.basename(style.href)
                        );

                        try {
                            let content = fs.readFileSync(filePath)
                            content = content.toString()
                            content = rewriteUrls(content, path);

                            return fs.writeFileSync(filePath, content)
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
                        'Error while structurizing assets. Please check structures.'
                    )
                );
                // eslint-disable-next-line no-console
                console.log(chalk.gray('Dist path:', dist));
                // eslint-disable-next-line no-console
                console.log(e);
                process.exit(1);
            });
    });
};

function rewriteUrls(string, path) {
    return rewriteCSSUrls(string, url => {
        if (!isNotRemote(url)) return url
        return Path.resolve(path, Path.basename(url))
    });
}
