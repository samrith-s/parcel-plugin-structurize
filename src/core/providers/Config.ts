import { cosmiconfigSync } from 'cosmiconfig';

import { DefaultConfig } from './../../default.config';

import { PackageProvider } from './Package';

export type ConfigInternal = Array<{
    match: string;
    folder: string;
}>;

export type Config = {
    config: ConfigInternal;
    filepath: string;
    isEmpty?: boolean;
};

export class ConfigProvider extends PackageProvider {
    private static config: Config;

    constructor() {
        super();
        if (!ConfigProvider.config) {
            const packageName = this.getPackageValue('name');

            const loadedConfig = cosmiconfigSync(packageName, {
                searchPlaces: ['package.json', `${packageName}.json`]
            }).search();

            if (!loadedConfig) {
                ConfigProvider.config = {
                    config: DefaultConfig,
                    filepath: 'default-config'
                };
            } else {
                ConfigProvider.config = loadedConfig;
            }
        }
    }

    public config(): ConfigInternal {
        return ConfigProvider.config.config;
    }

    public configPath(): string {
        return ConfigProvider.config.filepath;
    }

    public configIsEmpty(): boolean {
        return ConfigProvider.config.isEmpty;
    }

    public configIsDefault(): boolean {
        return !ConfigProvider.config || ConfigProvider.config.isEmpty;
    }
}
