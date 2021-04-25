import { readFile, writeFileSync } from 'fs';
import * as path from 'path';
import moveFile from 'move-file';
import chalk from 'chalk';
import deleteEmpty from 'delete-empty';

import { ConfigProvider } from './providers/Config';
import { AssetsGraphMap, AssetGraph } from './AssetMap';
import { logger } from '../logs';

export class FileManager extends ConfigProvider {
    private assetsMap: AssetsGraphMap;
    private moveTracker: Record<string, number>;
    private moves: {
        total: number;
        current: number;
    };
    private timer: {
        start: number;
        end: number;
    };

    constructor(assetsMap: AssetsGraphMap) {
        super();
        this.assetsMap = assetsMap;
        this.moveTracker = {};
        this.moves = {
            total: Array.from(this.assetsMap.values()).filter(
                o => o.destination && o.config.folder !== '.'
            ).length,
            current: 0,
        };
        this.timer = {
            start: 0,
            end: 0,
        };
    }

    public structurize(): void {
        this.timer.start = Date.now();
        Array.from(this.assetsMap.values()).forEach(asset => {
            this.rewriteAsset(asset);
        });
    }

    private rewriteAsset(asset: AssetGraph): void {
        if (this.isWriteable(asset.source)) {
            readFile(asset.source, (error, contents) => {
                if (error) {
                    throw error;
                }

                const newContent = this.performReplace(contents.toString(), asset.dependents);
                writeFileSync(asset.source, newContent, { encoding: 'utf-8', flag: 'w' });

                this.moveAsset(asset);
            });
        } else {
            this.moveAsset(asset);
        }
    }

    private isWriteable(source: string) {
        const extension = path.extname(source);
        return /(js|css|html|map)$/.test(extension);
    }

    private async moveAsset(asset: AssetGraph): Promise<void> {
        if (asset.destination) {
            await moveFile(asset.source, asset.destination);
            this.incrementCount(asset);
        }
    }

    private performReplace(contents: string, dependents: AssetGraph['dependents']): string {
        if (!dependents) {
            return contents;
        }

        return dependents.reduce((newContent, dependent) => {
            const thisDependent = this.assetsMap.get(dependent);
            if (thisDependent?.replacer) {
                newContent = newContent.replace(dependent, thisDependent.replacer);
            }

            return newContent;
        }, contents);
    }

    private incrementCount(asset: AssetGraph): void {
        if (asset.destination && asset.config.folder !== '.') {
            this.moveTracker[asset.config.folder] =
                (this.moveTracker[asset.config.folder] || 0) + 1;
            this.moves.current += 1;
        }

        if (this.moves.current === this.moves.total) {
            this.timer.end = Date.now();
            const difference = this.timer.end - this.timer.start;
            const fileLogs = Object.entries(this.moveTracker).map(
                ([folder, count]) =>
                    chalk` {dim - Moved ${count} files to ${path.join(
                        this.bundlerConfig.outDir.split('/').pop(),
                        folder
                    )}}`
            );

            if (this.config.displayAssetsMap) {
                logger.assetMap({ assetMap: this.assetsMap });
            }

            logger.complete({
                total: this.moves.total,
                difference,
                fileLogs,
            });

            deleteEmpty.sync(path.resolve(this.bundlerConfig.outDir));
        }
    }
}
