import { cosmiconfigSync } from 'cosmiconfig';

import { DefaultConfig } from './../../default.config';
import pkg from '../../../package.json';

import { BundlerProvider } from './Bundler';

export type ConfigInternal = {
    match: string;
    folder: string;
};

export type Config = {
    config: ConfigInternal[];
    filepath: string;
    isEmpty?: boolean;
};

export class ConfigProvider extends BundlerProvider {
    public static config: Config;

    public static init(): void {
        if (!ConfigProvider.config) {
            const packageName = pkg.name;

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
