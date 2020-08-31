import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import builtins from 'builtin-modules';

import pkg from './package.json';

const input = 'src/index.ts';

const plugins = [
    resolve(),
    commonjs(),
    json(),
    typescript({
        typescript: require('typescript'),
    }),
    terser({
        compress: true,
    }),
];

export default {
    input,
    output: {
        file: pkg.main,
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'development',
        exports: 'auto',
    },
    plugins,
    external: [...builtins],
};
