var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pacman"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM score ORDER BY Score DESC LIMIT 5 ", function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
  });
});

export default con;
