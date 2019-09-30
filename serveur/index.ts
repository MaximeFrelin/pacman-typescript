const express = require("express");
const multer = require("multer");
const multipart = multer();

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../../webpack.config.js");
var cors = require("cors");

import con from "./bdd/MySqlConnect";

const app = express();
const port = 8000;

const devServerEnabled = true;

if (devServerEnabled) {
  const compiler = webpack(config);

  app.use(cors());

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
  con.query("SELECT * FROM score", function(err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log("Server started on port:" + port);
});
