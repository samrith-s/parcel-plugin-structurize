/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-this-alias */

const NodeEnvironment = require('jest-environment-node');
const { pointToBundle, bundle } = require('./utils');

class BundlerEnvironment extends NodeEnvironment {
    pragmas;
    runSetup = false;
    bundle = null;
    entryFiles = null;
    bundle = null;

    constructor(config, context) {
        super(config, context);
        this.pragmas = context.docblockPragmas;
        this.runSetup = this.pragmas['bundle-run-setup'] === 'true';
        this.bundle = this.pragmas['bundle-name'];
        this.entryFiles = this.pragmas['bundle-entry']
            ? this.pragmas['bundle-entry'].split(/,\s*/)
            : null;
    }

    async setup() {
        await super.setup();
        if (this.runSetup) {
            const cwd = pointToBundle(this.bundle);
            await new Promise(resolve =>
                bundle.call(this, cwd, bundle => {
                    this.global.bundle = bundle;
                    this.global.lol = Math.random();
                    resolve();
                })
            );
        }
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = BundlerEnvironment;
