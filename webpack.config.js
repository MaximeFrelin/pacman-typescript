var webpack = require('webpack');
var path = require('path');

var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');


module.exports = {
    entry: "./src/index.ts",
    devtool: "source-map",
    output: {
        filename: "./bundle.js"
    },
    resolve: {
        extensions: [".ts"],
        alias: {
            phaser: phaser
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false)
        })
    ],
    watch: true
};