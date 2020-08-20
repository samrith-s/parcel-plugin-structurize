import pkg from '../../../package.json';

import { BundlerProvider } from './Bundler';

export type Package = Record<keyof typeof pkg, any>;

export class PackageProvider extends BundlerProvider {
    private static package: Package = null;

    constructor() {
        super();
        if (!PackageProvider.package) {
            PackageProvider.package = pkg;
        }
    }

    public getPackageValue(key: keyof Package): Package[typeof key] {
        return PackageProvider.package[key];
    }
}
