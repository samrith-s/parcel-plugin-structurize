import * as path from 'path';

import { ConfigProvider } from './providers/Config';

export interface AssetInfo {
    file: string;
    location: string;
    path: string;
}
export interface Asset extends AssetInfo {
    mapFile?: AssetInfo;
}

export class AssetMap extends ConfigProvider {
    private assetsMap: Asset[] = [];

    constructor() {
        super();
        this.generateAssetsMap();
    }

    public get(): Asset[] {
        return this.assetsMap;
    }

    private generateAssetsMap() {
        const bundleAssets = Array.from(this.bundler.bundleNameMap.values());
        bundleAssets.forEach(name => {
            if (path.extname(name) !== '.map') {
                const { publicUrl = '/', outDir } = this.bundlerConfig;
                const file = name;
                const asset: Asset = {
                    file,
                    location: path.join(outDir, file),
                    path: path.join(publicUrl, file)
                };

                if (bundleAssets.includes(`${file}.map`)) {
                    const mapFile = `${file}.map`;
                    asset.mapFile = {
                        file: mapFile,
                        location: path.join(outDir, mapFile),
                        path: path.join(publicUrl, mapFile)
                    };
                }

                this.assetsMap.push(asset);
            }
        });
    }
}
