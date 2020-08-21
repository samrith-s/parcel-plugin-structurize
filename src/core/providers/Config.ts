import { cosmiconfigSync } from 'cosmiconfig';

import { DefaultConfig } from './../../default.config';

import { PackageProvider } from './Package';

export type ConfigInternal = {
    match: string;
    folder: string;
};

export type Config = {
    config: ConfigInternal[];
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

    protected get config(): ConfigInternal[] {
        return ConfigProvider.config.config;
    }

    protected configPath(): string {
        return ConfigProvider.config.filepath;
    }

    protected configIsEmpty(): boolean {
        return ConfigProvider.config.isEmpty;
    }

    protected configIsDefault(): boolean {
        return !ConfigProvider.config || ConfigProvider.config.isEmpty;
    }
}
