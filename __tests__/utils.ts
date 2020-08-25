import * as path from 'path';
import { lstatSync, readdirSync } from 'fs';

import { Structurizer } from '../src/core/providers/Config';

import BundleConfig from './bundle/parcel-plugin-structurize.json';
import { stringify } from 'querystring';

export function getBundleDirectories(bundleDir: string): string[] {
    return readdirSync(bundleDir).filter(dir => lstatSync(path.join(bundleDir, dir)).isDirectory());
}

export function getConfigDirs(): string[] {
    return (BundleConfig.rules as Structurizer[])
        .filter(rule => rule.folder !== '.')
        .map(rule => rule.folder);
}

export function getFolderContains(): [string, string][] {
    return (BundleConfig.rules as Structurizer[])
        .sort((a, b) => {
            if (a.folder === '.' || a.folder < b.folder) {
                return -1;
            }

            if (a.folder > b.folder) {
                return 1;
            }

            return 0;
        })
        .map(rule => [rule.folder === '.' ? 'dist' : `dist/${rule.folder}`, rule.match]);
}

export function getFolderBasename(folder: string): string {
    if (folder === 'dist') {
        return '.';
    }

    return path.basename(folder);
}

export function getFolderFiles(bundleDir: string, folder: string): string[] {
    folder = getFolderBasename(folder);
    return readdirSync(path.join(bundleDir, folder))
        .filter(file => lstatSync(path.join(bundleDir, folder, file)).isFile())
        .map(file => file.replace(/(\.map)$/, ''));
}
