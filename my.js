var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "satyapriya",
  password: "Satyapriya"
});

con.connect(function(err) {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected!");
});
