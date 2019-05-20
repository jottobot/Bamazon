var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "LMUgrad2014",
  database: "bamazon_DB"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to Bamazon Shopping! Here are the items we have on sale: ");
  start();
});

function start() {
  var query = "SELECT ID, product_name, price FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt(
        [
          {
            name: "ID",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
          },
          {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase?"
          }
        ]
      )
      .then(function (answer) {
        //query using the ID user selects in prompt
        var query = "SELECT * FROM products WHERE ID=" + answer.ID;
        connection.query(query, function (err, results) {
          if (err) throw err;

          console.log("You have chosen " + answer.quantity + " " + results[0].product_name + "(s)!");

          if (results[0].stock_quantity > answer.quantity) {

            var price = answer.quantity * results[0].price;
            console.log("Your grand total is $" + price + " .");

            console.log("There are now " + (results[0].stock_quantity - answer.quantity) + " items left.");

            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: (results[0].stock_quantity - answer.quantity)
                },
                {
                  id: answer.ID
                }
              ],

              function (error) {
                if (error) throw err;
                // start();
              },
            );
          } else {
            console.log("So sorry, we do not have " + answer.quantity + " " + results[0].product_name + "'s.");
            // start();
          }
        });
      });
  });
}

