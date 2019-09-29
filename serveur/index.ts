// import connection from "./bdd/MySqlConnect";
const express = require("express");
const multer = require("multer");
const multipart = multer();

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack.config.js");

const app = express();
const port = 9000;

const devServerEnabled = true;

if (devServerEnabled) {
  const compiler = webpack(config);

  //Enable "webpack-dev-middleware"
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );

  //Enable "webpack-hot-middleware"
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static("./public"));

//API
app.get("/api/score", multipart.any(), function(req, res) {
  res.json("{'coucou': 'coucou'}");
});

app.listen(port, () => {
  console.log("Server started on port:" + port);
});
