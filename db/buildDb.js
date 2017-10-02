// set up sqlite3 database
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

// pull in arrays of simulated data
const productTypes = JSON.parse(fs.readFileSync('db/json/product_types.json'));
const users = JSON.parse(fs.readFileSync('db/json/users.json'));
const products = JSON.parse(fs.readFileSync('db/json/products.json'));
const payments = JSON.parse(fs.readFileSync('db/json/payment_types.json'));
const orders = JSON.parse(fs.readFileSync('db/json/orders.json'));
const orderProducts = JSON.parse(fs.readFileSync('db/json/ordersProducts.json'));

module.exports.createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // CUSTOMER DB INFO
      // orders table creation
      db.run(`DROP TABLE IF EXISTS orders`);

      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        customer_user_id INTEGER,
        payment_type_id INTEGER,
        order_date TEXT,
        FOREIGN KEY(customer_user_id) REFERENCES users(id),
        FOREIGN KEY(payment_type_id) REFERENCES payment_types(id) )`);

      // payment types table creation
      db.run(`DROP TABLE IF EXISTS payment_types`);

      db.run(`CREATE TABLE IF NOT EXISTS payment_types (
        id INTEGER PRIMARY KEY,
        customer_user_id INTEGER,
        type TEXT,
        account_number INTEGER,
        FOREIGN KEY(customer_user_id) REFERENCES users(id))`);

      // products table creation
      db.run(`DROP TABLE IF EXISTS products`);

      db.run(`CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY,
        product_type_id INTEGER,
        price REAL,
        title TEXT,
        description TEXT,
        original_quantity INTEGER,
        seller_user_id INTEGER,
        FOREIGN KEY(product_type_id) REFERENCES product_types(id))`);

      // users table creation
      db.run(`DROP TABLE IF EXISTS users`);

      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        account_created_date TEXT NOT NULL,
        last_login_date TEXT NOT NULL,
        street_address TEXT,
        city_address TEXT,
        state_code TEXT,
				zip_code TEXT,
				phone_number TEXT )`);

      // product types table creation
      db.run(`DROP TABLE IF EXISTS product_types`);

      db.run(`CREATE TABLE IF NOT EXISTS product_types (
              id INTEGER PRIMARY KEY,
              name TEXT)`);

      // ordersProducts join table creation
      db.run(`DROP TABLE IF EXISTS ordersProducts`);

      db.run(
        `CREATE TABLE IF NOT EXISTS ordersProducts (
              id INTEGER PRIMARY KEY,
              product_id INTEGER NOT NULL,
              order_id INTEGER NOT NULL,
              FOREIGN KEY(product_id) REFERENCES products(id),
              FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE)`,
        function(err) {
          if (err) return reject(err);
          resolve('createTables done');
        }
      );
    });
  });
};

module.exports.insertRows = () => {
  // CUSTOMER DB ROWS
  // orders table rows
  let ordersInsertPromises = orders.map(({ customer_user_id, payment_type_id, order_date }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO orders (customer_user_id, payment_type_id, order_date)
              VALUES('${customer_user_id}', '${payment_type_id}', '${order_date}')`,
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  });

  // payment types table rows
  let paymentsInsertPromises = payments.map(({ customer_user_id, type, account_number }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO payment_types(customer_user_id, type, account_number)
              VALUES('${customer_user_id}', '${type}', '${account_number}')`,
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  });

  // products table rows
  let productsInsertPromises = products.map(
    ({ product_type_id, price, title, description, original_quantity, seller_user_id }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id)
              VALUES('${product_type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}')`,
          function(err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      });
    }
  );

  // users table rows
  let usersInsertPromises = users.map(
    ({
      first_name,
      last_name,
      account_created_date,
      last_login_date,
      street_address,
      city_address,
      state_code,
      zip_code,
      phone_number
    }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (first_name, last_name, account_created_date, last_login_date, street_address, city_address, state_code, zip_code, phone_number)

              VALUES("${first_name}", "${last_name}", '${account_created_date}', '${last_login_date}', "${street_address}",  "${city_address}", '${state_code}', '${zip_code}', '${phone_number}' )`,
          function(err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      });
    }
  );

  // product types table rows
  let productTypesInsertPromises = productTypes.map(({ name }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO product_types (name)
              VALUES('${name}')`,
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  });

  // ordersProducts join table rows
  let orderProductsInsertPromises = orderProducts.map(({ product_id, order_id }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ordersProducts (product_id, order_id)
              VALUES('${product_id}', ${order_id})`,
        function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  });

  let insertPromisesArray = ordersInsertPromises.concat(
    paymentsInsertPromises,
    productsInsertPromises,
    usersInsertPromises,
    productTypesInsertPromises,
    orderProductsInsertPromises
  );

  return Promise.all(insertPromisesArray);
};
