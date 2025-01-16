import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default {
    input: 'src/background.js',
    output: {
        file: 'dist/background.js',
        format: 'es',
    },
    plugins: [
        terser(),
        copy({
            targets: [
                { src: 'assets/*', dest: 'dist' },
                { src: 'src/manifest.json', dest: 'dist' },
                { src: 'src/index.html', dest: 'dist' }
            ]
        })
    ]
};
