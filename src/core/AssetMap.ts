import * as path from 'path';
import minimatch from 'minimatch';
import sanitize from 'sanitize-filename';
import { ParcelBundle } from 'parcel-bundler';

import { ConfigProvider, Structurizer } from './providers/Config';

export interface AssetGraph {
    source: string;
    destination: string | null;
    replacer: string | null;
    mapFile: boolean;
    dependents: string[] | null;
    config: Structurizer;
}

export type AssetsGraphMap = Map<string, AssetGraph>;

export class AssetMap extends ConfigProvider {
    private assetsMap: AssetsGraphMap = new Map();
    private bundle: ParcelBundle;

    constructor(bundle: ParcelBundle) {
        super();
        this.bundle = bundle;
        this.generateAssetsMap();
    }

    public get(): AssetsGraphMap {
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

    private getFile(depAsset: ParcelBundle): string {
        const isRelative = depAsset.type === 'html' && !!depAsset.entryAsset?.relativeName;
        return isRelative ? depAsset.entryAsset.relativeName : path.basename(depAsset.name);
    }

    private iterativeDependencyResolver(depAsset: ParcelBundle): void {
        const file = this.getFile(depAsset);
        const extension = path.extname(file);
        const mapFile = extension === '.map';
        const fileConfig = (this.config.rules as Structurizer[]).find(c => {
            return minimatch(mapFile ? file.replace(/(\.map)$/, '') : file, c.match);
        });

        const currentPath = this.generateCurrentPath(file);

        this.assetsMap.set(currentPath, {
            source: this.generateCurrentPath(file, true),
            destination: this.generateNewPath(file, fileConfig, true),
            replacer: this.generateNewPath(file, fileConfig),
            mapFile,
            dependents: null,
            config: fileConfig,
        });

        if (depAsset.childBundles.size) {
            const currentMap = this.assetsMap.get(currentPath);
            currentMap.dependents = [];
            depAsset.childBundles.forEach((childBundle: ParcelBundle) => {
                currentMap.dependents.push(this.generateCurrentPath(this.getFile(childBundle)));
                this.iterativeDependencyResolver(childBundle);
            });
        }
    }

    private generateCurrentPath(file: string, full?: boolean): string {
        if (full) {
            return path.join(this.bundlerConfig.outDir, file);
        }

        return path.join(this.bundlerConfig.publicUrl, file);
    }

    private generateNewPath(file: string, fileConfig: Structurizer, destination?: boolean): string {
        return fileConfig
            ? path.join(
                  destination ? this.bundlerConfig.outDir : this.bundlerConfig.publicUrl,
                  fileConfig.folder
                      .split('/')
                      .map(name => sanitize(name))
                      .join('/'),
                  fileConfig.flatten ? path.basename(file) : file
              )
            : null;
    }
}
