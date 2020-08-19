import * as path from 'path';
import ParcelBundler from 'parcel-bundler';

interface Bundler extends ParcelBundler {
    bundleNameMap: Map<string, string>;
}

interface Asset {
    file: string;
    mapFile?: string;
}

export class AssetMap {
    private bundler: Partial<Bundler>;
    private assetsMap: Asset[] = [];

    constructor(bundler: Partial<Bundler>) {
        this.bundler = bundler;
        this.generateAssetsMap();
    }

    public get() {
        return this.assetsMap;
    }

    private generateAssetsMap() {
        const bundleAssets = Array.from(this.bundler.bundleNameMap.values());
        bundleAssets.forEach(name => {
            console.log(path.extname(name));
            if (path.extname(name) !== 'map') {
                const file = name;
                let mapFile: string | undefined;

                if (bundleAssets.includes(`${file}.map`)) {
                    mapFile = `${file}.map`;
                }

                this.assetsMap.push({
                    file,
                    mapFile
                });
            }
        });
    }
}
