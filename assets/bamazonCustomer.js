var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LMUgrad2014",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to Bamazon Shopping! Here are the items we have on sale: ");
});

connection.query("SELECT * from products", function (err, results) {
  if (!err) {
    console.log(results);
    start();
  }
  else
    console.log("Error");
});

// function which prompts the user for what action they should take
function start() {
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
          message: "How many items would you like to purchse?"
        }
      ]
    )
    .then(function (answer) {
      var number = answer.ID;
      var itemQuantity = answer.quantity;
      var query = "SELECT * FROM products";

      connection.query(query, function (err, results) {

        if (err) throw err;
        console.log("You have chose(n) " + itemQuantity + " of item number " + number + " !");
        
        // re-prompt the user for if they want to bid or post
        // buy();
      }
      );
    });
}

// // function to handle posting new items up for auction
// function buy() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "units",
//         type: "input",
//         message: "How many units would you like to purchase?"
//       },

//       // validate: function(value) {
//       //   if (isNaN(value) === false) {
//       //     return true;
//       //   }
//       //   return false;

//     ])
//     .then(function (answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function (err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function artistSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function (answer) {
//       var query = "SELECT position, song, year FROM top5000 WHERE ?";
//       connection.query(query, { artist: answer.artist }, function (err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }