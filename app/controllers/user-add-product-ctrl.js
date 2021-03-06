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
    console.log("Press ctrl+'c' to go back to main menu at any point");
    // console logs to make the prompt look prettier
    console.log('Adding a new product!\n');
    console.log('Product-Types\n');
    // get all product types to display. we will need these as users should not be expected to have memorized product types by number
    dbGetAllProductTypes().then(productTypes => {
      let productTypeRegex = '^([1-9]|';
      productTypes.forEach((type, typeIndex) => {
        if (typeIndex === productTypes.length - 1) console.log(`Option ${typeIndex + 1}: ${type.name}\n`);
        else console.log(`Option ${typeIndex + 1}: ${type.name}`);
      });
      // creates dynamic regex depending on the total product type.
      let splitNum = productTypes.length.toString().split('');
      if (splitNum.length == 1) productTypeRegex = `^([1-${splitNum[0]}])$`;
      else if (splitNum.length > 1) {
        for (let i = 0; i < splitNum.length; i++) {
          productTypeRegex += `[0-${splitNum[i]}]`;
        }
        productTypeRegex += ')$';
      }
      // begin user prompt
      prompt.get(
        [
          {
            name: 'product_type_id',
            description: 'Select product type from the listed types (by number)',
            type: 'string',
            required: true,
            pattern: productTypeRegex,
            message: 'Only numbers displayed in the menu are accepted.'
          },
          {
            name: 'price',
            description: 'Set unit price (number up to two decimals)',
            type: 'string',
            pattern: /^[1-9]\d.*$/,
            message: 'Only digits allowed',
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
            description: 'How many do you have for sale? (number)',
            type: 'string',
            pattern: /^[1-9]\d*$/,
            message: 'Only digits allowed',
            required: true
          }
        ],
        // callback
        function(err, results) {
          if (err) return reject('\nBack to Main Menu', err);
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
