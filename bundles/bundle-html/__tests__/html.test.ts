/**
 * @bundle-name bundle-html
 * @bundle-entry src/index.html, src/app.html
 * @bundle-run-setup true
 */

test('Build structure is ok', () => {
    expect(1 + 1).toEqual(2);
});
