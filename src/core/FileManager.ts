import { AssetMap } from './AssetMap';

export class FileManager {
    private assetsMap: AssetMap['assetsMap'] = [];

    constructor(private map: AssetMap) {
        this.assetsMap = map.get();
    }
}
