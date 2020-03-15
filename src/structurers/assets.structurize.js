const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');
const rewriteCSSUrls = require('css-url-rewrite');

const { isRemote } = require('../util');

module.exports = function({ dist, origin, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;
        const path = Path.join(prefix, folder)
        const rewriteUrls = (string, path) => {
            return rewriteCSSUrls(string, url => {
                if (isRemote(url, origin + prefix)) return url
                return Path.join('/', path, Path.basename(url))
            });
        }

        move(Path.join(dist, match), Path.join(dist, folder))
            .then(() => {
                markups.forEach(async document => {
                    const allAssets = await document.querySelectorAll(
                        `img, link[rel*="icon"]`
                    );
                    const allStyles = await document.querySelectorAll(
                        'style, link[rel="stylesheet"]'
                    );

                    await allAssets.forEach(image => {
                        let attrValue = 'src';
                        if (image.tagName === 'LINK') {
                            attrValue = 'href';
                        }

                        const fileName = Path.basename(image[attrValue])

                        image[attrValue] = origin + Path.join('/', path, fileName);
                        return image[attrValue];
                    });

                    await allStyles.forEach(async style => {
                        if (style.tagName === 'STYLE') {
                            style.textContent = rewriteUrls(
                                style.textContent,
                                path
                            );
                            return style.textContent
                        }
                        if (isRemote(style.href, origin + prefix)) return

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
                console.log(
                    chalk.red.bold(
                        'Error while structurizing assets. Please check structures.'
                    )
                );
                console.log(chalk.gray('Dist path:', dist));
                console.log(e);
                process.exit();
            });
    });
};
