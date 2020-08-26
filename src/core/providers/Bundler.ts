import ParcelBundler, { ParcelOptions } from 'parcel-bundler';

interface Bundler extends ParcelBundler {
    bundleNameMap: Map<string, string>;
}

export class BundlerProvider {
    protected static bundler: Bundler = null;

    static init(bundler: ParcelBundler): void {
        if (!BundlerProvider.bundler) {
            BundlerProvider.bundler = bundler as Bundler;
        }
    }

    protected get bundler(): Bundler {
        return BundlerProvider.bundler;
    }

    protected get bundlerConfig(): ParcelOptions {
        return {
            ...this.bundler['options'],
            publicUrl: this.bundler['options'].publicURL || '/',
        };
    }
}
