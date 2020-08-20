import Path from 'path';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import ParcelBundler from 'parcel-bundler';
import { cosmiconfigSync } from 'cosmiconfig';

import pkg from '../package.json';
import defaultConfig from './default.structure.json';

import assetsStructurizer from './structurers/assets.structurize';
import scriptsStructurizer from './structurers/scripts.structurize';
import stylesStructurizer from './structurers/styles.structurize';

import { AssetMap } from './core/AssetMap';
import { BundlerProvider } from 'core/providers/Bundler';

const structurizers = {
    assets: assetsStructurizer,
    scripts: scriptsStructurizer,
    styles: stylesStructurizer
};

export default function Structurize(bundler: ParcelBundler) {
    if (process.env.NODE_ENV === 'production') {
        // const packageConfig = pkg[pkg.name];
        // console.dir(bundler);
        // if (packageConfig !== false) {
        //     const {
        //         options: { outDir: DIST_PATH, publicURL }
        //     } = bundler;
        //     const origin = publicURL.replace(/^(https?:\/\/[^/]+)?.*/, '$1');
        //     const prefix = Path.join('/', publicURL.replace(origin, ''));
        //     const config = {
        //         ...defaultConfig,
        //         ...packageConfig
        //     };
        //     const configEntries = Object.entries(config).sort((a, b) => {
        //         if (a[0] < b[0]) {
        //             return -1;
        //         }

        //         if (a[0] > b[0]) {
        //             return 1;
        //         }

        //         return 0;
        //     });

        //     bundler.on('buildEnd', async () => {
        //         const markupFiles = Array.from(bundler.bundleNameMap)
        //             .filter(file => /\.html$/.test(file[1]))
        //             .map(file => Path.basename(file[1]));

        //         const markups = markupFiles.map(file => new JSDOM(fs.readFileSync(Path.resolve(DIST_PATH, file))).window.document);

        //         for (let [structurer, options] of configEntries) {
        //             await structurizers[structurer]({
        //                 dist: DIST_PATH,
        //                 origin: origin,
        //                 prefix: prefix,
        //                 options,
        //                 markups
        //             });
        //         }

        //         markupFiles.forEach((file, index) => {
        //             fs.writeFileSync(Path.resolve(DIST_PATH, file), markups[index].documentElement.outerHTML);
        //         });
        //     });
        // }
        BundlerProvider.init(bundler);

        bundler.on('bundled', () => {
            const map = new AssetMap();
            console.log('config path:', map.configPath());
            console.log('config:', map.config());
            console.log(map.get());
        });
    }
}
