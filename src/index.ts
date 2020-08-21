import ParcelBundler from 'parcel-bundler';
import chalk from 'chalk';

import { BundlerProvider } from './core/providers/Bundler';
import { ConfigProvider } from './core/providers/Config';
import { AssetMap } from './core/AssetMap';
import { FileManager } from './core/FileManager';

export default function Structurize(bundler: ParcelBundler): void {
    if (process.env.NODE_ENV === 'production') {
        process.on('uncaughtException', errorHandler);
        process.on('unhandledRejection', errorHandler);

        BundlerProvider.init(bundler);

        bundler.on('bundled', bundle => {
            ConfigProvider.init();
            console.log(chalk`
 {cyan parcel-plugin-structurize}
 {dim Config: ${ConfigProvider.config.filepath}}
        `);
            const map = new AssetMap(bundle);
            const fm = new FileManager(map.get());
            fm.structurize();
        });
    }
}

function errorHandler(error: Error) {
    console.log(chalk`
 {yellow The plugin "parcel-plugin-custom-dist-structure" has encountered an error.}

 {red ${error.stack}}

 {dim If you think this is a bug, use this link to report it on Github.
 http://bit.ly/parcel-plugin-structurize-bug}
    `);
}
