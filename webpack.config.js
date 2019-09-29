const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

// module.exports = {
//   entry: ["@babel/polyfill", "./src/index.ts"],
//   mode: "development",
//   target: "node",
//   output: {
//     path: path.resolve(__dirname, "build"),
//     publicPath: "/build",
//     filename: "project.bundle.js"
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "build"),
//     compress: true,
//     port: 9000
//   },
//   resolve: {
//     extensions: [".ts", ".js"],
//     modules: ["src", "node_modules"]
//     // alias: {
//     //   phaser: phaser
//     // }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: "babel-loader",
//         include: path.join(__dirname, "src")
//       },
//       {
//         test: [/\.vert$/, /\.frag$/],
//         use: "raw-loader"
//       },
//       {
//         test: /\.ts$/,
//         loader: "ts-loader"
//       }
//     ]
//   },

//   plugins: [
//     new webpack.DefinePlugin({
//       CANVAS_RENDERER: JSON.stringify(true),
//       WEBGL_RENDERER: JSON.stringify(true)
//     }),
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, "/index.html")
//     }),
//     new CopyPlugin([
//       {
//         from: path.resolve(__dirname, "src/assets"),
//         to: path.resolve(__dirname, "build/assets")
//       }
//     ]),
//     new webpack.IgnorePlugin(/^pg-native$/)
//   ]
// };

module.exports = {
  target: "node",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
    host: `localhost`
  },
  entry: {
    app: ["./client/index.ts"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/js/",
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "false", //commonjs,amd,umd,systemjs,auto
                    useBuiltIns: "usage",
                    targets: "> 0.25%, not dead",
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: "ts-loader"
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
        from: path.resolve(__dirname, "./client/assets"),
        to: path.resolve(__dirname, "public/assets")
      }
    ])
  ]
};
