import * as path from 'path';
import * as minimatch from 'minimatch';

import { ConfigProvider, ConfigInternal } from './providers/Config';
import { ParcelBundle } from 'parcel-bundler';

export interface AssetGraph {
    [key: string]: {
        newPath: string | null;
        mapFile: boolean;
        dependents: string[] | null;
    };
}

export class AssetMap extends ConfigProvider {
    private assetsMap: AssetGraph = {};
    private bundle: ParcelBundle;

    constructor(bundle: ParcelBundle) {
        super();
        this.bundle = bundle;
        this.generateAssetsMap();
    }

    public get(): AssetGraph {
        return this.assetsMap;
    }

    private generateAssetsMap() {
        if (this.bundle.entryAsset) {
            this.iterativeDependencyResolver(this.bundle);
        } else {
            this.bundle.childBundles.forEach(asset => {
                this.iterativeDependencyResolver(asset);
            });
        }
    }

    private iterativeDependencyResolver(depAsset: ParcelBundle): void {
        const file = path.basename(depAsset.name);
        const extension = path.extname(file);
        const mapFile = extension === '.map';
        const fileConfig = this.config.find(c => {
            return minimatch.default(mapFile ? file.replace(/(\.map)$/, '') : file, c.match);
        });

        this.assetsMap[file] = {
            newPath: this.generatePath(file, fileConfig),
            mapFile,
            dependents: null
        };

        if (depAsset.childBundles.size) {
            this.assetsMap[file].dependents = [];
            depAsset.childBundles.forEach(childBundle => {
                this.assetsMap[file].dependents.push(path.basename(childBundle.name));
                this.iterativeDependencyResolver(childBundle);
            });
        }
    }

    private generatePath(file: string, fileConfig: ConfigInternal): string {
        return fileConfig ? path.join(this.bundlerConfig.publicUrl, fileConfig.folder, file) : null;
    }
}
