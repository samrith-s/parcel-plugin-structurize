import { cosmiconfigSync } from 'cosmiconfig';

import pkg from '../../../package.json';
import { DefaultConfig } from './../../default.config';
import { logger } from '../../logs';

import { BundlerProvider } from './Bundler';

export type Structurizer = {
    match: string;
    folder: string;
    flatten?: boolean;
};

export type Config = {
    rules: Structurizer[] | false;
    verbose?: boolean;
    displayAssetsMap?: boolean;
};

export type LoadedConfig = {
    config: Config;
    filepath: string;
    isEmpty?: boolean;
};

export class ConfigProvider extends BundlerProvider {
    public static config: LoadedConfig;
    public static hasRules = true;

    public static init(): void {
        if (!ConfigProvider.config) {
            const packageName = pkg.name;

            const loadedConfig = cosmiconfigSync(packageName, {
                searchPlaces: ['package.json', `${packageName}.json`],
            }).search();

            if (!loadedConfig) {
                ConfigProvider.config = {
                    config: DefaultConfig,
                    filepath: 'default-config',
                };
            } else {
                ConfigProvider.config = loadedConfig;
            }

            ConfigProvider.checkConfig(ConfigProvider.config.config);
        }
    }

    private static checkConfig(config: Config): void {
        Object.keys(config).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(DefaultConfig, key)) {
                logger.invalidConfigKey({ key }, false);
            }
        });

        this.checkRules(config.rules);
    }

    private static checkRules(rules: Config['rules']): void {
        if (rules !== false && !rules) {
            throw new Error(`No 'rules' key found in config.`);
        }

        if (typeof rules === 'boolean' && rules) {
            throw new Error(
                `The key 'rules' cannot be set to a truthy boolean value. Expected: Structurizer[] | false, got: true`
            );
        }

        if (typeof rules !== 'boolean' && !Array.isArray(rules)) {
            throw new Error(
                `Unexpected type ${typeof rules} for 'rules' provided. Expected: Structurizer[] | false, got: ${typeof rules}.`
            );
        }

        if (Array.isArray(rules) && !rules.every(rule => rule['folder'] && rule['match'])) {
            throw new Error(
                `Every structurizer in 'rules' should have 'match' and 'folder' keys with values.`
            );
        }

        if (Array.isArray(rules) && !rules.length) {
            this.hasRules = false;
        }
    }

    public static isVerbose(): boolean {
        return ConfigProvider.config.config.verbose || false;
    }

    protected get hasRules(): boolean {
        return ConfigProvider.hasRules;
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
