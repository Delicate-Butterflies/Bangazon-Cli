// set up sqlite3 database
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/bangazon.sqlite');

// pull in functions to generate fake data:
const { generateTypes } = require('./faker/product-types');
const { generateUsers } = require('./faker/users');
const { generateProducts } = require('./faker/products');
const { generateEmployees } = require('./faker/employees');
const { generateDepartments } = require('./faker/departments');
const { generatePaymentTypes } = require('./faker/payment-types');
const { generateTrainingPrograms } = require('./faker/training-programs');
const { generateOrders } = require('./faker/orders');
const { generateComputers } = require('./faker/computers');
const { generateEmployeeTrainings } = require('./faker/employeeTrainings');
const { generateEmployeeComputers } = require('./faker/employeeComputers');
const { generateOrderProducts } = require('./faker/orderProducts');

// generate arrays of simulated data
const productTypes = generateTypes();
const users = generateUsers();
const products = generateProducts();
const payments = generatePaymentTypes();
const orders = generateOrders();
const employees = generateEmployees();
const departments = generateDepartments();
const trainingPrograms = generateTrainingPrograms();
const computers = generateComputers();
const employeeTrainings = generateEmployeeTrainings(trainingPrograms); // pass trainingPrograms array into join table generation for max attendance per
const employeeComputers = generateEmployeeComputers();
const orderProducts = generateOrderProducts();

module.exports.createTables = () => {

  return new Promise((resolve, reject) => {

  });

  // employees table creation
  db.run(`DROP TABLE IF EXISTS employees`);

  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    department_id INT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    job_title TEXT,
    street_address TEXT,
    city_address TEXT,
    state_code TEXT,
    zip_code INT)`
  );

  // training_programs table creation
  db.run(`DROP TABLE IF EXISTS training_programs`);

  db.run(`CREATE TABLE IF NOT EXISTS training_programs (
    id INTEGER PRIMARY KEY,
    start_date TEXT,
    end_date TEXT,
    max_attendance INT,
    title TEXT)`
  );

  // departments table creation
  db.run(`DROP TABLE IF EXISTS departments`);

  db.run(`CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY,
    supervisor_employee_id INT,
    expense_budget INT NOT NULL,
    name TEXT NOT NULL)`
  );

  // computers table creation
  db.run(`DROP TABLE IF EXISTS computers`);

  db.run(`CREATE TABLE IF NOT EXISTS computers (
    id INTEGER PRIMARY KEY,
    purchase_date TEXT NOT NULL,
    decommission_date TEXT,
    serial_number TEXT NOT NULL)`
  );

  // employeesTrainings table creation
  db.run(`DROP TABLE IF EXISTS employeesTrainings`);

  db.run(`CREATE TABLE IF NOT EXISTS employeesTrainings (
    id INTEGER PRIMARY KEY,
    program_id INT,
    employee_id INT)`
  );

  // employeesComputers table creation
  db.run(`DROP TABLE IF EXISTS employeesComputers`);

  db.run(`CREATE TABLE IF NOT EXISTS employeesComputers (
    id INTEGER PRIMARY KEY,
    employee_id INT,
    computer_id INT,
    assign_date TEXT,
    return_date TEXT,
    FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY(computer_id) REFERENCES computers(id) ON DELETE CASCADE)`
  );

  // CUSTOMER DB INFO
  // orders table creation
  db.run(`DROP TABLE IF EXISTS orders`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer_user_id INTEGER,
    payment_type_id INTEGER,
    order_date TEXT,
    FOREIGN KEY(customer_user_id) REFERENCES users(id),
    FOREIGN KEY(payment_type_id) REFERENCES payment_types(id) )`
  );

  // payment types table creation
  db.run(`DROP TABLE IF EXISTS payment_types`);

  db.run(`CREATE TABLE payment_types (
    id INTEGER PRIMARY KEY,
    customer_user_id INTEGER,
    type TEXT,
    account_number INTEGER,
    FOREIGN KEY(customer_user_id) REFERENCES users(id))`
  );

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
    FOREIGN KEY(product_type_id) REFERENCES product_types(id))`
  );

  // users table creation
  db.run(`DROP TABLE IF EXISTS users`);

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    account_created_date TEXT NOT NULL,
    last_login_date TEXT NOT NULL,
    street_address TEXT,
    city_address TEXT,
    state_code TEXT,
    zip_code TEXT )`
  );

  // product types table creation
  db.run(`DROP TABLE IF EXISTS product_types`);

  db.run(`CREATE TABLE product_types (
          id INTEGER PRIMARY KEY,
          name TEXT)`
  );

  // ordersProducts join table creation
  db.run(`DROP TABLE IF EXISTS ordersProducts`);

  db.run(`CREATE TABLE ordersProducts (
          id INTEGER PRIMARY KEY,
          product_id INTEGER NOT NULL,
          order_id INTEGER NOT NULL,
          FOREIGN KEY(product_id) REFERENCES products(id),
          FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE)`, (err) => {
      if (err) return reject(err);
      resolve("createTables done");
    });

};

module.exports.insertRows = () => {

  // employees table rows
  let employeeInsertPromises = employees.map(({ department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO employees (department_id, first_name, last_name, phone_number, job_title, street_address, city_address, state_code, zip_code)
              VALUES (${department_id}, "${first_name}", "${last_name}", "${phone_number}", "${job_title}", "${street_address}", "${city_address}", "${state_code}", ${zip_code})`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // training_programs table rows
  let trainingProgramsInsertPromises = trainingPrograms.map(({ start_date, end_date, max_attendance, title }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO training_programs (start_date, end_date, max_attendance, title)
              VALUES ("${start_date}", "${end_date}", ${max_attendance}, "${title}")`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // departments table rows
  let departmentsInsertPromises = departments.map(({ supervisor_employee_id, expense_budget, name }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO departments (supervisor_employee_id, expense_budget, name)
              VALUES (${supervisor_employee_id}, ${expense_budget}, "${name}")`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // computers table rows
  let computersInsertPromises = computers.map(({ purchase_date, decommission_date, serial_number }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO computers (purchase_date, decommission_date, serial_number)
              VALUES ("${purchase_date}", "${decommission_date}", "${serial_number}")`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // employeesTrainings table rows
  let employeeTrainingsInsertPromises = employeeTrainings.map(({ program_id, employee_id }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO employeesTrainings (program_id, employee_id)
              VALUES (${program_id}, ${employee_id})`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // employeesComputers table rows
  let employeeComputersInsertPromises = employeeComputers.map(({ employee_id, computer_id, assign_date, return_date }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO employeesComputers (employee_id, computer_id, assign_date, return_date)
              VALUES (${employee_id}, ${computer_id}, '${assign_date}', '${return_date}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // CUSTOMER DB ROWS
  // orders table rows
  let ordersInsertPromises = orders.map(({ customer_user_id, payment_type_id, order_date }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO orders (customer_user_id, payment_type_id, order_date)
              VALUES('${customer_user_id}', '${payment_type_id}', '${order_date}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // payment types table rows
  let paymentsInsertPromises = payments.map(({ customer_user_id, type, account_number }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO payment_types(customer_user_id, type, account_number)
              VALUES('${customer_user_id}', '${type}', '${account_number}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // products table rows
  let productsInsertPromises = products.map(({ type_id, price, title, description, original_quantity, seller_user_id }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO products(product_type_id, price, title, description, original_quantity, seller_user_id)
              VALUES('${type_id}', '${price}', '${title}', '${description}', '${original_quantity}', '${seller_user_id}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // users table rows
  let usersInsertPromises = users.map(({ first_name, last_name, account_created_date, last_login_date, address_street, address_city, address_state, address_zip }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (first_name, last_name, account_created_date, last_login_date, street_address, city_address, state_code, zip_code)
              VALUES("${first_name}", "${last_name}", '${account_created_date}', '${last_login_date}', "${address_street}",  "${address_city}", '${address_state}', '${address_zip}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // product types table rows
  let productTypesInsertPromises = productTypes.map(({ name }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO product_types (name)
              VALUES('${name}')`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  // ordersProducts join table rows
  let orderProductsInsertPromises = orderProducts.map(({ product_id, order_id }) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO ordersProducts (product_id, order_id)
              VALUES('${product_id}', ${order_id})`, function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
    });
  });

  let insertPromisesArray = employeeInsertPromises.concat(
    trainingProgramsInsertPromises,
    departmentsInsertPromises,
    computersInsertPromises,
    employeeTrainingsInsertPromises,
    employeeComputersInsertPromises,
    ordersInsertPromises,
    paymentsInsertPromises,
    productsInsertPromises,
    usersInsertPromises,
    productTypesInsertPromises,
    orderProductsInsertPromises
  );

  return Promise.all(insertPromisesArray);

};