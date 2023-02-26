import { rollup } from 'rollup';
import esmImportToUrl from 'rollup-plugin-esm-import-to-url';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import alias from 'rollup-plugin-alias';
import livereload from 'rollup-plugin-livereload';

const pkg = require('./package.json');

export default [
    {
    input: 'src/jsactionsappstarter.js',
    
    output: {
        file: 'dist/module/jsactionsappstarter.js',
        format: 'es',
        freeze: false,
        name: 'jsactionsappstarter',
        sourcemap:false
    },
    plugins: [
        alias({
            resolve: ['.js'],
            entries: {
                './jsactions.js': 'jsactions'
            }
        }),
        esmImportToUrl({
            imports: {
                'jsactions': 'https://www.unpkg.com/@jsactionsframework/jsactions@1.0.2/dist/jsactions.min.js',
            }
        }),
        copy({
            targets: [
              { src: 'index.html', dest: 'dist/' },
              { src: 'index.js', dest: 'dist/' }
            ]
          })
    ]
},
{
    input: 'src/jsactionsappstarter.js',
    
    output: {
        file: 'dist/module/jsactionsappstarter.min.js',
        format: 'es',
        freeze: false,
        name: 'jsactionsappstarter',
        sourcemap:false
    },
    plugins: [
        alias({
            resolve: ['.js'],
            entries: {
                './jsactions.js': 'jsactions'
            }
        }),
        esmImportToUrl({
            imports: {
                'jsactions': 'https://www.unpkg.com/@jsactionsframework/jsactions@1.0.2/dist/jsactions.min.js',
            }
        }),
        terser({
            output: {
              comments: false
            }
        }),
        serve({
            open: true,
            openPage: '/index.html',
            contentBase: ['dist'],
            host: 'localhost',
            port: 10002
        }),
        livereload('dist')
    ]
}
];