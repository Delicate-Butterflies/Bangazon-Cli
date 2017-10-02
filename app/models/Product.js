'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

/**
 * Gets all products from the products table
 * @param {} - no arguments
 */
module.exports.dbGetAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, productdata) => {
      if (err) return reject(err);
      resolve(productdata);
    });
  });
};

/**
 * Gets a single product by its id
 * @param {number} id - the primary key of the product
 */
module.exports.dbGetSingleProduct = id => {
  // TODO check that there is still inventory available
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM products
            WHERE id = ${id}`,
      (err, productdata) => {
        if (err) return reject(err);
        resolve(productdata);
      }
    );
  });
};

/**
 * Creates a new product on the product table
 * @param {object} newProduct - Object with keys: product_type_id, price, title, description, original_quantity, seller_user_id
 */
module.exports.dbPostProduct = newProduct => {
  return new Promise((resolve, reject) => {
    let { product_type_id, price, title, description, original_quantity, seller_user_id, created_on } = newProduct;
    db.run(
      `INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id, created_on)
      VALUES('${product_type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}', '${created_on}')`,
      function (err) {
        if (err) return reject(err);
        resolve({ message: 'new product', id: this.lastID });
      }
    );
  });
};

/**
 * Deletes a product on the product table
 * @param {number} id - Primary key of product to be deleted
 */
module.exports.dbDeleteProduct = id => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM products WHERE id = ${id}`, function (err) {
      if (err) return reject(err);
      resolve({ message: 'product deleted', id: this.lastID });
    });
  });
};

/**
 * Modifies a product on the product table
 * @param {object} req - Object with body that contains one or more keys:  price, title, description, original_quantity, seller_user_id
 * @param {number} product_id - Primary key of the product to be modified
 */
module.exports.dbPutProduct = (productUpdateObj, product_id) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE products SET `;
    let keys = Object.keys(productUpdateObj);
    keys.forEach(key => {
      query += `"${key}" = "${productUpdateObj[key]}",`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ${product_id}`;
    db.run(query, function (err) {
      if (err) return reject(err);
      resolve({ message: 'product updated', rows_updated: this.changes });
    });
  });
};

/**
 * Gets all products by one seller
 * @param {number} seller_ID - User Id of the seller
 */
module.exports.dbGetAllProductsBySellerID = seller_ID => {
  // Sends query to database to get all products with given seller's ID
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products WHERE seller_user_id = ${seller_ID}`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports.dbGetProductSoldQty = (id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT p.id, p.product_type_id, p.price, p.title, p.description, p.original_quantity, count(op.id) as sold_quantity, p.seller_user_id
            FROM products p
            JOIN ordersProducts op ON p.id = op.product_id
            JOIN orders o ON op.order_id = o.id
            WHERE p.id = ${id}
            AND o.payment_type_id != 'null'
            GROUP BY p.id`, (err, rows) => {


      });
  });
};

module.exports.dbCheckForProductSales = product_id => {
  // takes product id, returns number of product sold(data.sold) and original_quantity (data.original_quantity)
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT count(op.product_id) as sold, p.original_quantity
			FROM products p, orders o, ordersProducts op
			WHERE  p.id = ${product_id}
			AND p.id = op.product_id
			AND op.order_id = o.id
			AND o.payment_type_id != 'null'`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
};

module.exports.removeProductFromOpenOrders = () => { };

module.exports.dbGetAllProductsByUser = userId => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products WHERE seller_user_id = ${userId}`, (err, productdata) => {
      if (err) return reject(err);
      resolve(productdata);
    });
  });
};

/*
	TODO - db currently has no products that have not sold, according to following query:
	SELECT count(op.product_id) as sold, p.original_quantity
	FROM products p, orders o, ordersProducts op
	WHERE p.id = op.product_id
	AND op.order_id = o.id
	AND o.payment_type_id != 'null'
	GROUP BY p.id
	having count(p.id = op.product_id) = 0
*/

/*
  dbDeleteRemainingProductQuantity
  ARGS: product_id (from product table)
  takes a product id, removes the remaining quantity
  TODO: db product has original quantity, not quantity remaining.
  new property? other way to display remaining after sales?
*/
// module.exports.dbDeleteRemainingProductQuantity = product_id => {};
