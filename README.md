# Bamazon

## Overview
BAMAZON is an Amazon-like storefront. The app takes in orders from customers and depletes stock from the store's inventory. 

<!-- As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store. -->


## Requirements 
* Teriminal or bash
* Node installation
* MYSQL workbench installation included with a host, port, username and password
* These NPM packages:
  * Require
  * MYSQL



## Usage
Upon running the app, all of the items in Bamazon's store will be loaded to the user. The user will then be promptend on which item number they would like to buy and the quanity desired.

If there are enough items in stock, the user's request is filled. The "store" aka MYSQL database is then updated to how many items are remaining. The user is alerted the total for their purchase.

If there are not enough items in stock, the user will be prompted "insufficient quantity."

## Link to see how Bamazon works