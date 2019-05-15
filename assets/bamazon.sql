DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2),
  stock_quantity INT,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "electronics", 100, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 20, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "jewlery", 30, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "beauty", 15, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("succulent", "gardening", 3.50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blanket", "home goods", 15, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kitchen chair", "home goods", 40, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster", "home goods", 20.20, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 10, 120);

SELECT * FROM products

