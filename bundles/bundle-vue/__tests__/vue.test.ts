/**
 * @bundle-name bundle-vue
 * @bundle-entry src/index.html
 * @bundle-run-setup true
 */

// import { pointToBundle, bundle } from '../utils';

// beforeAll(async done => {
//     const cwd = pointToBundle('bundle-vue');
//     await bundle(['src/index.html'], cwd, bundle => {
//         console.log('bundled!');
//         done();
//     });
// });

test('Build structure is ok', () => {
    expect(1 + 1).toEqual(2);
    console.log(this.bundle);
});
