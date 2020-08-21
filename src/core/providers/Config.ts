import { cosmiconfigSync } from 'cosmiconfig';

import { DefaultConfig } from './../../default.config';
import pkg from '../../../package.json';

import { BundlerProvider } from './Bundler';

export type Structurizer = {
    match: string;
    folder: string;
};

export type Config = {
    verbose?: boolean;
    rules: Structurizer[];
};

export type LoadedConfig = {
    config: Config;
    filepath: string;
    isEmpty?: boolean;
};

export class ConfigProvider extends BundlerProvider {
    public static config: LoadedConfig;

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

    protected get config(): Config {
        return ConfigProvider.config.config;
    }

    protected get rules(): Config['rules'] {
        return ConfigProvider.config.config.rules;
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
