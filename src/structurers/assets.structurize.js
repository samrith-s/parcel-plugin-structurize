const Path = require('path');
const fs = require('fs');
const move = require('glob-move');
const chalk = require('chalk');
const rewriteCSSUrls = require('css-url-rewrite');

const { isNotRemote, extractFileName } = require('../util');

module.exports = function({ dist, prefix, options, markups }) {
    return new Promise(resolve => {
        const { folder, match } = options;

        move(`${dist}/${match}`, `${dist}/${folder}`)
            .then(() => {
                markups.forEach(async document => {
                    const allAssets = await document.querySelectorAll(
                        `img, source, link[rel*="icon"]`
                    );
                    const allStyles = await document.querySelectorAll(
                        'style, link'
                    );
                    const path = [prefix, folder].join('/');
                    await allAssets.forEach(image => {
                        let attrValue = 'src';
                        if (image.tagName === 'SOURCE') attrValue = 'srcset';
                        if (image.tagName === 'LINK') attrValue = 'href';

                        const src = extractFileName(
                            image.getAttribute(attrValue)
                        );
                        image.setAttribute(attrValue, `${path}/${src}`);
                    });

                    await allStyles.forEach(async style => {
                        try {
                            if (style.tagName === 'LINK') {
                                const filePath = Path.join(
                                    dist,
                                    extractFileName(style.href)
                                );
                                if (fs.existsSync(filePath)) {
                                    let content = await fs
                                        .readFileSync(filePath)
                                        .toString();
                                    content = rewriteUrls(content, path);
                                    await fs.writeFileSync(filePath, content);
                                }
                            } else {
                                style.textContent = rewriteUrls(
                                    style.textContent,
                                    path,
                                    ''
                                );
                            }
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
        if (isNotRemote(url)) {
            return `${path}/${url.split('/').pop()}`;
        }

        return url;
    });
}
