import ParcelBundler from 'parcel-bundler';

import { AssetMap } from './core/AssetMap';
import { BundlerProvider } from './core/providers/Bundler';

export default function Structurize(bundler: ParcelBundler): void {
    if (process.env.NODE_ENV === 'production') {
        BundlerProvider.init(bundler);

        bundler.on('bundled', bundle => {
            console.log(__dirname);
            console.log(process.cwd());
            const map = new AssetMap(bundle);
            console.log(map.get());
        });
    }
}
