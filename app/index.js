const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test',
  port: 3306
});

connection.query(
  `CREATE TABLE IF NOT EXISTS person(
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    register varchar(50)
  )ENGINE=INNODB;`
  ,function(err, results, fields){
    if(err){
      console.log(`error on create table => ${err}`);
      return;
    }
    console.log("Table created");
});
connection.query(
  `
      INSERT INTO person(register) VALUES ('Anderson')
  `,
  function(err, results, fields){
    if(err){
      console.log(`error on insert register => ${err}`);
      return;
    }
    console.log("register created");
  }
)

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {

  connection.query("select * from person", function(erro, results){
    
    var data = '';
    results.forEach(item =>data+=`<h3>${item.register}</h3><br>`)
    
    res.send(`
    <h1>FULL CYCLE ROCKS</h1><br>
    ${data}
  `);
  })
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});