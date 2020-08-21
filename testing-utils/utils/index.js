/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const ParcelBundler = require('parcel-bundler');

exports.pointToBundle = function(bundleName) {
    return path.resolve(process.cwd(), 'bundles', bundleName);
};

exports.bundle = function bundle(cwd, callback) {
    const newEntryFiles = this.entryFiles.reduce(
        (entries, file) => [...entries, path.join(cwd, file)],
        []
    );
    const bundler = new ParcelBundler(newEntryFiles, {
        outDir: path.join(cwd, 'dist')
    });
    bundler.on('bundled', callback);
    bundler.bundle();
};
