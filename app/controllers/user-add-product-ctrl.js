'use strict';
/* eslint-disable no-console */

// require modules
const prompt = require('prompt');
const { dbGetAllProductTypes } = require('../models/Product-Type');
const { dbPostProduct } = require('../models/Product');
const { getActiveCustomer } = require('../activeCustomer');

// start prompt
module.exports.promptNewProduct = () => {
  return new Promise((resolve, reject) => {
    // console logs to make the prompt look prettier
    console.log('Adding a new product!\n');
    console.log('Product-Types\n');

    // get all product types to display. we will need these as users should not be expected to have memorized product types by number
    dbGetAllProductTypes().then(productTypes => {
      productTypes.forEach((type, typeIndex) => {
        if (typeIndex === productTypes.length - 1) console.log(`Option ${typeIndex + 1}: ${type.name}\n`);
        else console.log(`Option ${typeIndex + 1}: ${type.name}`);
      });

      // begin user prompt
      prompt.get(
        [
          {
            name: 'product_type_id',
            description: 'Select product type from the listed types (by number)',
            type: 'string',
            required: true
          },
          {
            name: 'price',
            description: 'Set unit price',
            type: 'string',
            required: true
          },
          {
            name: 'title',
            description: 'Set product name',
            type: 'string',
            required: true
          },
          {
            name: 'description',
            description: 'Set product description',
            type: 'string',
            required: true
          },
          {
            name: 'original_quantity',
            description: 'How many do you have for sale?',
            type: 'string',
            required: true
          }
        ],
        // callback
        function(err, results) {
          if (err) return reject(err);
          results.product_type_id -= 1; //MUST SUBTRACT BY 1. Options were +1'd to make options more user readable (i.e. didnt start at 0)
          results.seller_user_id = getActiveCustomer(); //active user becomes seller of new product
          dbPostProduct(results).then(prodData => {
            if (err) return reject(err);
            resolve(prodData);
          });
        }
      );
    });
  });
};
