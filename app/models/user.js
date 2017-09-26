'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');

const db = new Database('./db/bangazon.sqlite');

module.exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, (err, userData) => {
      if (err) reject(err);
      // console.log('userdata', userData);
      resolve(userData);
    });
  });
};

module.exports.getUser = id => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ${id}`, (err, userData) => {
      if (err) reject(err);
      // console.log('userdata', userData);
      resolve(userData);
    });
  });
};

module.exports.saveNewUser = () => {};
