// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'index.js',
        format: 'cjs',
        compact: true,
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
};
