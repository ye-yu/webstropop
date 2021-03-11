import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import uglify1 from "@lopatnov/rollup-plugin-uglify";
import { uglify as uglify2 } from "rollup-plugin-uglify";
import typescript from 'rollup-plugin-typescript2';

export default {

    //  Our games entry point (edit as required)
    input: [
        './src/webstropop.ts'
    ],

    //  Where the build file is to be generated.
    //  Most games being built for distribution can use iife as the module type.
    //  You can also use 'umd' if you need to ingest your game into another system.
    //  The 'intro' property can be removed if using Phaser 3.21 or above. Keep it for earlier versions.
    output: {
        file: './dist/webstropop.min.js',
        name: 'WebstroPop',
        format: 'iife',
        sourcemap: true,
        intro: 'var global = window;'
    },

    plugins: [

        //  Toggle the booleans here to enable / disable Phaser 3 features:
        replace({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(true),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true),
            preventAssignment: true
        }),

        //  Parse our .ts source files
        resolve({
            extensions: [ '.ts', '.tsx' ]
        }),

        //  We need to convert the Phaser 3 CJS modules into a format Rollup can use:
        commonjs({
            include: [
                'node_modules/eventemitter3/**',
                'node_modules/phaser/**'
            ],
            exclude: [ 
                'node_modules/phaser/src/polyfills/requestAnimationFrame.js'
            ],
            sourceMap: false,
            ignoreGlobal: true
        }),

        //  See https://www.npmjs.com/package/rollup-plugin-typescript2 for config options
        typescript(),

        //  See https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify for config options
        uglify1({
            mangle: {
                toplevel: true
            },
            ecma: 5,
            keep_classnames: false,
            keep_fnames: false,
            format: {
                comments: false,
                beautify: false,
                indent_level: false
            },
        }),

        uglify2({
            sourcemap: true
        })
    ]
};
