import * as path from 'path';
import minimatch from 'minimatch';

import { getBundleDirectories, getFolderContains, getConfigDirs, getFolderFiles } from './utils';
// import ParcelBundler, { ParcelBundle, ParcelOptions } from 'parcel-bundler';

// const Bundler = (global as any).Bundler as ParcelBundler;
// const bundlerOptions = Bundler['options'] as ParcelOptions;
// const bundleNameMap = Bundler['bundleNameMap'];
// const bundle = (global as any).bundle as ParcelBundle;
let bundleDirectories = [];

const bundleDir = path.resolve(process.cwd(), '__tests__', 'bundle', 'dist');

beforeAll(() => {
    bundleDirectories = getBundleDirectories(bundleDir);
});

describe('Structurization output', () => {
    it('All directories specified in config exist', () => {
        expect(bundleDirectories).toEqual(expect.arrayContaining(getConfigDirs()));
    });

    test.each(getFolderContains())(
        'The %p folder only contains files which match %p',
        (folder, match) => {
            const files = getFolderFiles(bundleDir, folder);
            files.forEach(file => {
                expect(minimatch(file, match)).toBeTruthy();
            });
        }
    );
});
