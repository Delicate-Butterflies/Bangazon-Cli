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
    let { product_type_id, price, title, description, original_quantity, seller_user_id } = newProduct;
    db.run(
      `INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id)
      VALUES('${product_type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}')`,
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
      resolve({ message: 'delete successful', rows_deleted: this.changes });
    });
  });
};

/**
 * Modifies a product on the product table
 * @param {object} req - Object with body that contains one or more keys:  price, title, description, original_quantity, seller_user_id
 * @param {number} product_id - Primary key of the product to be modified
 */
module.exports.dbPutProduct = (req, product_id) => {
  let product = req.body;
  return new Promise((resolve, reject) => {
    let query = `UPDATE products SET `;
    let keys = Object.keys(product);
    keys.forEach(key => {
      query += `"${key}" = "${product[key]}",`;
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
