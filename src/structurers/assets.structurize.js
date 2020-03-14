const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');
const rewriteCSSUrls = require('css-url-rewrite');

const { isNotRemote } = require('../util');

module.exports = function({ dist, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;

        move(Path.resolve(dist, match), Path.resolve(dist, folder))
            .then(() => {
                markups.forEach(async document => {
                    const allAssets = await document.querySelectorAll(
                        `img, link[rel*="icon"]`
                    );
                    const allStyles = await document.querySelectorAll(
                        'style, link[rel="stylesheet"]'
                    );
                    const path = Path.resolve(prefix, folder);

                    await allAssets.forEach(image => {
                        let attrValue = 'src';
                        if (image.tagName === 'LINK') {
                            attrValue = 'href';
                        }

                        const fileName = Path.basename(image[attrValue])

                        return image[attrValue] = Path.resolve(path, fileName);
                    });

                    await allStyles.forEach(async style => {
                        if (style.tagName === 'STYLE') {
                            return style.textContent = rewriteUrls(
                                style.textContent,
                                path
                            );
                        }
                        if (!isNotRemote(style.href)) return

                        const filePath = Path.resolve(
                            dist,
                            Path.basename(style.href)
                        );

                        try {
                            let content = fs.readFileSync(filePath)
                            content = content.toString();
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

function rewriteUrls(string, path) {
    return rewriteCSSUrls(string, url => {
        if (!isNotRemote(url)) return url
        return Path.resolve(path, Path.basename(url))
    });
}
