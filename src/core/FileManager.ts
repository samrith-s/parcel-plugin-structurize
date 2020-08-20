import { AssetMap } from './AssetMap';
import { ConfigProvider } from './providers/Config';

export class FileManager extends ConfigProvider {
    private assetsMap: AssetMap['assetsMap'] = [];

    constructor(private map: AssetMap) {
        super();
        this.assetsMap = map.get();
    }
}
