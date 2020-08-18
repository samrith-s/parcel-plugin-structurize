import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import builtins from 'builtin-modules';

import pkg from './package.json';

const input = 'src/index.ts';

const plugins = [
    resolve(),
    commonjs(),
    json(),
    typescript({
        typescript: require('typescript')
    })
];

export default {
    input,
    output: {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto'
    },
    plugins,
    external: [...builtins, 'jsdom']
};
