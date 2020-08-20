import { ConfigInternal } from './core/providers/Config';

export const DefaultConfig: ConfigInternal = [
    {
        match: '*.js',
        folder: 'js'
    },
    {
        match: '*.css',
        folder: 'css'
    },
    {
        match: '*.{jpg,jpeg,jpeg2,png,gif,svg,.bmp,.webp}',
        folder: 'assets'
    }
];
