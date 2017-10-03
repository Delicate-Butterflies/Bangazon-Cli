'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');
const { red, blue } = require('chalk');

let { dbCheckForProductSales, dbDeleteProduct, dbGetAllProductsByUser } = require('../models/Product.js');
let { dbDeleteOpenOrderByProduct } = require('../models/Order-Product.js');

module.exports.removeUserProduct = user_id => {
  return new Promise((resolve, reject) => {
    console.log("Press ctrl+'c' to go back to main menu at any point");
    dbGetAllProductsByUser(user_id).then(data => {
      if (data.length == 0) {
        return reject(`${red('Customer has no products')}`);
      }
      let productArr = [];
      console.log(`Customer #${user_id} - all Products:`);
      data.forEach((product, index) => {
        productArr.push(product);
        console.log(`${index + 1}. ${product.title} (product ID ${product.id})`);
      });
      prompt.get(
        [
          {
            name: 'number',
            description: 'Please select Product'
          }
        ],
        function(err, choice) {
          if (err) return reject('\nBack to Main Menu', err);
          else if (parseInt(choice.number) < 1 || choice.number > productArr.length) {
            return reject(`${red(`\n  >>No product #${choice.number} listed<<`)}`);
          } else {
            let productId = productArr[choice.number - 1].id;
            dbCheckForProductSales(productId).then(data => {
              // if product has sold - reject (change to adjust quantity at some point)
              if (data.sold === 0) {
                // TODO add sold < original quantity case
                dbDeleteProduct(productId)
                  .then(() => {
                    dbDeleteOpenOrderByProduct(productId)
                      .then(() => {
                        resolve(`${blue(`\n Product id ${productId} removed`)}`);
                      })
                      .catch(err => {
                        return reject('\nBack to Main Menu', err);
                      });
                  })
                  .catch(err => {
                    return reject('\nBack to Main Menu', err);
                  });
              } else if (data.sold > 0) {
                // TODO - change original quantity to # sold? (available)
                // TODO - OR remove from all open orders, but do not delete product or closed orderProduct
                resolve(`${red(`\n >>Cannot remove product id #${productId}, it is associated with orders<<`)}`);
              } else {
                resolve(`${red('\n >>Removing product unsuccessfull<<')}`);
              }
            });
          }
        }
      );
    });
  });
};
