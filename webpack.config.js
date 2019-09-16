var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');


module.exports = {
    context: __dirname,
    entry: 'index.ts',
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    output: {
        filename: "./bundle.js"
    },
    resolve: {
        extensions: [".ts", "js"],
        modules: ["src", "node_modules"],
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
            "typeof EXPERIMENT AL": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false)
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets'),
        }])
    ],
    watch: true
};