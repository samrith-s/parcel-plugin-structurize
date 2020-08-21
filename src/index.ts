import ParcelBundler from 'parcel-bundler';

import { BundlerProvider } from './core/providers/Bundler';
import { ConfigProvider } from './core/providers/Config';
import { AssetMap } from './core/AssetMap';
import { FileManager } from './core/FileManager';

import { logger } from './logs';

export default function Structurize(bundler: ParcelBundler): void {
    if (process.env.NODE_ENV === 'production') {
        process.on('uncaughtException', errorHandler);
        process.on('unhandledRejection', errorHandler);

        BundlerProvider.init(bundler);

        bundler.on('bundled', bundle => {
            ConfigProvider.init();
            logger.welcome();
            const map = new AssetMap(bundle);
            const fm = new FileManager(map.get());
            fm.structurize();
        });
    }
}

function errorHandler(error: Error) {
    logger.error({ error });
}
