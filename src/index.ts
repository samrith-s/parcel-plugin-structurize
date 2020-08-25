import ParcelBundler from 'parcel-bundler';

import { BundlerProvider } from './core/providers/Bundler';
import { ConfigProvider } from './core/providers/Config';
import { AssetMap } from './core/AssetMap';
import { FileManager } from './core/FileManager';

import { logger } from './logs';

export default function Structurize(bundler: ParcelBundler): void {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'jest') {
        logger.clearLine(2);
        process.on('uncaughtException', errorHandler);
        process.on('unhandledRejection', errorHandler);

        BundlerProvider.init(bundler);
        ConfigProvider.init();

        bundler.on('bundled', bundle => {
            if (shouldRunPlugin()) {
                logger.welcome();
                const map = new AssetMap(bundle);
                const fm = new FileManager(map.get());
                fm.structurize();
            }
        });
    }
}

function shouldRunPlugin(): boolean {
    if (ConfigProvider.config.config.rules && process.env.PARCEL_PLUGIN_STRUCTURIZE !== 'false') {
        if (ConfigProvider.hasRules) {
            return true;
        }

        logger.noRules();
        return false;
    }
}

function errorHandler(error: Error) {
    logger.error({ error });
}
