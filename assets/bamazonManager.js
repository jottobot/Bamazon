var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "LMUgrad2014",
  database: "bamazon_DB"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Bamazon Shopping's manager page!");
  ask();
});

function ask() {
  inquirer
    .prompt({
      name: "ask",
      type: "list",
      message: "Menu options: What would you like to do?",
      choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
    })
    .then(function (answer) {
      switch (answer.ask) {
        case "View products for sale":
          sale();
          break;

        case "View low inventory":
          low();
          break;

        case "Add to inventory":
          inventory();
          break;

        case "Add new product":
          product();
          break;
      }
    });
}

function sale () {
  var query = "SELECT ID, product_name, price, stock_quantity FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
  ask();
  });
}

function low () {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    
    // if stock_quantity < 6, then log all of this inventory 
    for (var i = 0; i > results.length; i++) {
      if (results[i].stock_quantity < 100) {
        console.log(results[i].product_name);  
      } else {
        console.log("All items have more than 5 in stock.");     
      }
    }
  ask();
  });
}

function inventory() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;

    inquirer
    .prompt(
    [
      {
      name: "inventoryItem",
      type: "input",
      message: "Which item do you want to add more inventory to?",
      },
      {
      name: "inventory",
      type: "input",
      message: "How many items do you want to add?",
      }
    ])
    .then(function (answer) {
      
      var item = answer.inventoryItem;
      var add = answer.inventory;

      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: (item.stock_quantity + add)
          },
          {
            id: add.ID
          }
        ],
      )
      console.log("You added " + answer.inventory + " " + answer.inventoryItem + "(s) to the inventory.");
      
      ask();
    });

  });
}