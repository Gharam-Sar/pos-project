const express = require("express");
const sqlite3 = require("sqlite3").verbose();
let sql;
//database connection
const dp = new sqlite3.Database("./pos.dp", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.log(err.message);
  else console.log("connected to database");
});

sql = "CREATE TABLE IF NOT EXISTS users(userName,password)";
dp.run(sql);

sql = "CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY,name)";
dp.run(sql);
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/user/:username/:password", (req, res) => {
  let result = "";
  var username = req.params.username;
  var password = req.params.password;
  sql = "SELECT password FROM users WHERE userName=?";
  dp.all(sql, [username], (err, rows) => {
    if (err) return console.log(err.message);

    let str = rows[0].password;
    if (str == password) res.json("success");
    else res.json("no");
  });
});

app.get("/categories", (req, res) => {
  sql = "SELECT * FROM categories";
  dp.all(sql, [], (err, rows) => {
    if (err) return console.log(err.message);
    res.json(rows);
  });
});

app.delete("/categories/:name", (req, res) => {
  var name = req.params.name;
  sql = "DELETE FROM categories WHERE name=?";
  dp.run(sql, [name], (err) => {
    if (err) return console.log(err.message);
    sql = "SELECT * FROM categories";
    dp.all(sql, [], (err, rows) => {
      if (err) return console.log(err.message);
      res.json(rows);
    });
  });
});
app.post("/addCategories/:name", function (req, res) {
  var name = req.params.name;
  sql = "INSERT INTO categories(name) VALUES (?)";
  dp.run(sql, [name], (err) => {
    if (err) return console.log(err.message);
    sql = "SELECT * FROM categories";
    dp.all(sql, [], (err, rows) => {
      if (err) return console.log(err.message);
      res.json(rows);
    });
  });
});

app.put("/editCategories/:id/:name", function (req, res) {
  var id = req.params.id;
  var name = req.params.name;

  sql = "UPDATE categories SET name=? WHERE id=?";
  dp.run(sql, [name, id], (err) => {
    if (err) return console.log(err.message);
    sql = "SELECT * FROM categories";
    dp.all(sql, [], (err, rows) => {
      if (err) return console.log(err.message);
      res.json(rows);
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
