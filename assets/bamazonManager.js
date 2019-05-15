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

// I believe there is something wrong with my for loop here,
// Loop through results[i].stock_quantity and log items that have less than 6
function low () {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;

    // if (results.length === 0) {
    //     console.log("All items have more than 5 in stock.");
    // }
    // else {
    //     console.log("These items have low stock:")
    //     console.table(results);
    // }
    
    // if stock_quantity < 5, then log all of this inventory 
    for (var i = 0; i < results.length; i++) {
      if (results[i].stock_quantity < 6) {
        // console.log("These items are low in inventory:");     
        // console.table(results);      
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
      name: "item",
      type: "input",
      message: "Which item do you want to add more inventory to? (Please enter with ID).",
      },
      {
      name: "inventory",
      type: "input",
      message: "How many items do you want to add?",
      }
    ])
    .then(function (answer) {

      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: (answer.inventory + answer.item.stock_quantity)
          },
          {
            id: answer.item
          }
        ],
      )
      console.log("You added " + answer.inventory + " more item(s) successfully.");
      
      ask();
    });
  });
}

// THIS WORKS
function product () {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What item do you want to add to the inventory?"
      },
      {
        name: "department",
        type: "input",
        message: "Department of item?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price per item?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many items are you adding?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {

    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.item,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity,
      },
      function(err) {
        if (err) throw err;
        console.log("Your item was added successfully!");
        ask();
      }
    );
    })
  });
}