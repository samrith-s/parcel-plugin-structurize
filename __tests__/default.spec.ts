import * as path from 'path';
import { readdirSync } from 'fs';
// import ParcelBundler, { ParcelBundle, ParcelOptions } from 'parcel-bundler';

// const Bundler = (global as any).Bundler as ParcelBundler;
// const bundlerOptions = Bundler['options'] as ParcelOptions;
// const bundleNameMap = Bundler['bundleNameMap'];
// const bundle = (global as any).bundle as ParcelBundle;
const directoryMap = {};

const bundleDir = path.resolve(process.cwd(), '__tests__', 'bundle', 'dist');

beforeAll(() => {
    const bundleDirectories = readdirSync(bundleDir);
    console.log('dirs', bundleDirectories);
});

test('Build structure is ok', () => {
    expect(1 + 1).toEqual(2);
});
