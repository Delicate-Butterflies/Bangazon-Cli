'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.dbPostOrderProduct = (order_id, product_id, product_qty) => {
  return new Promise((resolve, reject) => {
    if (!product_qty) product_qty = 1;
    for (let i = 0; i < product_qty; i++) {
      db.run(
        `INSERT INTO ordersProducts
            (order_id, product_id)
            VALUES (${order_id}, ${product_id})`,
        function(err) {
          if (err) return reject(err); // TODO need to delete new order, too?
        }
      );
    }
    resolve(`${product_qty} quantity of product ${product_id} added to order ${order_id}`);
  });
};

module.exports.dbOrderProductsWithInfo = order_id => {
  return new Promise((resolve, reject) => {
    //select (and count) rows that match order id, join with product info for those product ids
    db.all(
      `
      SELECT op.product_id, count(op.product_id) as quantity, p.title, p.price
      FROM ordersProducts op
      JOIN products p
      WHERE op.order_id = ${order_id}
      AND op.product_id = p.id
      GROUP BY op.product_id`,
      function(err, orderProductData) {
        if (err) return reject(err);
        resolve(orderProductData);
      }
    );
  });
};

module.exports.dbPutOrderProduct = (order_id, product_id, quantity) => {
  return new Promise((resolve, reject) => {
    if (!quantity) quantity = 1;
    for (let i = 0; i < quantity; i++) {
      db.run(
        `INSERT INTO ordersProducts
            (order_id, product_id)
            VALUES (${order_id}, ${product_id})`,
        function(err) {
          if (err) return reject(err);
        }
      );
    }
    resolve(`${quantity} quantity of product ${product_id} added to order ${order_id} `);
  });
};

module.exports.dbDeleteOrderProduct = (order_id, product_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      DELETE
      FROM ordersProducts
      WHERE order_id = ${order_id}
      AND product_id = ${product_id}`,
      function(err) {
        if (err) return reject(err);
        resolve({ message: 'delete successful', rows_deleted: this.changes });
      }
    );
  });
};

module.exports.getPopularProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `select count(*) as total_products,p.title, p.id productId,count(distinct order_id) as purchasers, sum(p.price) as revenue
      from ordersProducts op, products p
      where p.id = op.product_id
      group by op.product_id
      order by total_products desc
      limit 3`,
      function(err, popularProductData) {
        if (err) return reject(err);
        resolve(popularProductData);
      }
    );
  });
};
