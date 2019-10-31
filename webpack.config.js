const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
    host: `localhost`,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  entry: {
    app: ["babel-polyfill", "./client/index.ts"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/js/",
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["src", "node_modules"]
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "client/assets"),
        to: path.resolve(__dirname, "public/assets")
      }, {
        from: path.resolve(__dirname, "client/music"),
        to: path.resolve(__dirname, "public/music")
      }
    ])
  ]
};
