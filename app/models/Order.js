'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');
// pragma needed for orderProduct table cascade deletion
db.run('PRAGMA foreign_keys = ON');

module.exports.dbGetAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders`, function(err, allOrderData) {
      if (err) return reject(err);
      resolve(allOrderData);
    });
  });
};

module.exports.dbGetOneOrder = id => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM orders
      WHERE id = ${id}`,
      function(err, orderData) {
        if (err) return reject(err);
        resolve(orderData);
      }
    );
  });
};

/**
 * Updates the current order with the user's selected payment type. This action completes the order.
 * @param {number} - order ID from order table representing current active user's open order
 * @param {object} - object containing key/value to be updated in the order object
 * @return {promise} - resolves with a message that the order has been successfully updated
 */
module.exports.dbPutOrder = (order_id, order) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE orders SET `;
    let keys = Object.keys(order);
    keys.forEach(key => {
      query += `'${key}' = '${order[key]}',`;
    });
    query = query.slice(0, -1);
    query += ` WHERE id = ${order_id}`;
    db.run(query, function(err) {
      if (err) return reject(err);
      resolve('order updated');
    });
  });
};

module.exports.dbDeleteOrder = id => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM orders
      WHERE id = ${id}`,
      function(err) {
        if (err) return reject(err);
        resolve({ message: 'order deleted', id: this.lastID });
      }
    );
  });
};

module.exports.dbPostOrder = (customer_user_id, payment_type_id, product_id) => {
  return new Promise((resolve, reject) => {
    // TODO add product_id call to add orderProduct rows
    if (!product_id) return reject('must include product_id');
    if (!payment_type_id) payment_type_id = null;
    let order_date = new Date().toISOString();
    db.run(
      `INSERT INTO orders
      (customer_user_id, payment_type_id, order_date)
      VALUES (${customer_user_id}, ${payment_type_id}, '${order_date}')`,
      function(err) {
        if (err) return reject(err);
        resolve({ message: 'new order', id: this.lastID }); // returns ID of new order
      }
    );
  });
};

module.exports.dbGetSellerOrders = user_id => {
  // gets all paid orders with a product from seller
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT u.first_name, u.last_name,  o.id as order_id
			FROM users u, orders o, ordersProducts op, products p
			WHERE u.id = ${user_id}
			AND u.id = p.seller_user_id
			AND op.product_id = p.id
			AND op.order_id = o.id
			AND o.payment_type_id != 'null'
			GROUP BY o.id`,
      (err, orders) => {
        if (err) return reject(err);
        resolve(orders);
      }
    );
  });
};
/**
 * Queries the database to select user's open order (currently, there are multiple open orders for individual users, so we are only taking the first order from the returned array)
 * @param {number} - user ID from user table representing current active user
 * @return {promise} - resolves with the first user's open order
 */
module.exports.dbGetOpenOrderByUser = userId => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders WHERE customer_user_id = ${userId} AND payment_type_id = 'null'`, function(err, data) {
      if (err) return reject(err);
      resolve(data[0]);
    });
  });
};
/**
 * Queries the database to calculate the order total
 * @param {number} orderId - order ID from order table representing current active user's open order
 * @returns {promise} - resolves the current order's total
 */
module.exports.dbOrderTotal = orderId => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT SUM(p.Price) AS orderTotal
            FROM products p, ordersProducts r, orders o
            WHERE p.id IS r.product_id
            AND r.order_id = o.id
            And o.id = ${orderId}`,
      function(err, data) {
        if (err) return reject(err);
        resolve(data[0].orderTotal);
      }
    );
  });
};
