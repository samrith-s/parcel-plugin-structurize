import { Config } from './core/providers/Config';

export const DefaultConfig: Config = {
    rules: [
        {
            match: '*.js',
            folder: 'js',
        },
        {
            match: '*.css',
            folder: 'css',
        },
        {
            match: '*.{jpg,jpeg,jpeg2,png,gif,svg,bmp,webp}',
            folder: 'assets',
        },
    ],
    verbose: false,
    displayAssetsMap: false,
};
