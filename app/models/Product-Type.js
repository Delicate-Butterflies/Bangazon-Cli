'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');
db.run(`PRAGMA foreign_keys = ON`);

module.exports.dbGetAllProductTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM product_types`, (err, productTypeData) => {
      if (err) return reject(err);
      resolve(productTypeData);
    });
  });
};

module.exports.dbGetOneProductType = id => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM product_types WHERE id = ${id}`, (err, productTypeData) => {
      if (err) return reject(err);
      resolve(productTypeData);
    });
  });
};

module.exports.dbPostProductType = req => {
  let type = req.body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO product_types(name)
    VALUES('${type.name}')`,
      function(err) {
        if (err) return reject(err);
        resolve({ message: 'new product type', id: this.lastID });
      }
    );
  });
};

module.exports.dbPutProductType = (req, product_type_id) => {
  let product = req.body;
  return new Promise((resolve, reject) => {
    db.run(`UPDATE product_types SET 'name' = '${product.name}' WHERE id = ${product_type_id}`, err => {
      if (err) return reject(err);
      // TODO EditedproductTypeData.name could be included in message? unused currently.
      resolve({ message: 'training_program updated', rows_updated: this.changes });
    });
  });
};

module.exports.dbDeleteProductType = id => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products WHERE product_type_id = ${id}`, function(err, data) {
      if (err) return reject(err);
      if (data.length === 0) {
        db.run(`DELETE FROM product_types WHERE id = ${id}`, function(err) {
          if (err) return reject(err);
          resolve({ message: 'product type deleted', id: this.lastID });
        });
      } else return reject('Cannot delete this Data, It has Products associated with it');
    });
  });
};
