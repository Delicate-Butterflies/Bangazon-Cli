'use strict';
/* eslint-disable no-console */

// require modules
const prompt = require('prompt');

const { dbGetAllStaleProducts, dbGetUsersStaleProducts } = require('../models/Product');

// start prompt
module.exports.promptStaleProductsChoice = userId => {
  return new Promise((resolve, reject) => {
    console.log('What whould you like to view?');
    console.log('1. All stale products.');
    console.log('2. Your stale products.');
    prompt.get(
      [
        {
          name: 'stale_products_choice',
          description: 'Enter 1 or 2',
          pattern: '^([1-2])$',
          message: 'Answer must be a 1 or 2',
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        console.log('stale products choice', results.stale_products_choice);
        let userChoice = results.stale_products_choice;
        if (userChoice == 1) {
          dbGetAllStaleProducts().then(data => {
            for (let i = 0; i < data.length; i++) {
              console.log(`${data[i].id}: ${data[i].title}`);
            }
          });
        } else {
          dbGetUsersStaleProducts(userId).then(data => {
            for (let i = 0; i < data.length; i++) {
              console.log(`${data[i].id}: ${data[i].title}`);
            }
          });
        }
        console.log();
      }
    );
  });
};
