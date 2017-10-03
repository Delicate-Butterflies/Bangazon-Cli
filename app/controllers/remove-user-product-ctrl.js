'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');
const { red, blue } = require('chalk');

let { dbCheckForProductSales, dbDeleteProduct, dbGetAllProductsByUser, dbPutProduct } = require('../models/Product.js');
let { dbDeleteOpenOrderByProduct } = require('../models/Order-Product.js');

/**
 * Removes a users product from database, or if there are closed orders with product, set original_quantity to # sold (available = 0).
 * @param {user_id} - order ID from order table representing current active user's open order
 * @param {productId} - selected from prompt choice.number inside function: the id of product to remove
 * @return {promise} - resolves with a message that the product has been successfully updated, or rejects with error
 */
module.exports.removeUserProduct = user_id => {
  return new Promise((resolve, reject) => {
    console.log('Press ctrl+"c" to exit at any time');
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
          if (err) {
            return reject(err);
          } else if (parseInt(choice.number) < 1 || choice.number > productArr.length) {
            return reject(`${red(`\n  >>No product #${choice.number} listed<<`)}`);
          } else {
            let productId = productArr[choice.number - 1].id;
            dbCheckForProductSales(productId).then(data => {
              if (data.sold == 0 || data.sold == undefined) {
                console.log('no products sold');
                // TODO add sold < original quantity case
                dbDeleteProduct(productId)
                  .then(() => {
                    dbDeleteOpenOrderByProduct(productId)
                      .then(() => {
                        resolve(`${blue(`\n Product id ${productId} removed from database`)}`);
                      })
                      .catch(err => {
                        return reject('\nBack to Main Menu', err);
                      });
                  })
                  .catch(err => {
                    return reject('\nBack to Main Menu', err);
                  });
              } else if (data.sold > 0) {
                let productUpdate = { original_quantity: data.sold };
                console.log('productUpdate', productUpdate);
                dbPutProduct(productUpdate, productId)
                  .then(updateData => {
                    console.log('updateData', updateData);
                    // remove from all open orders (remove open order ordersProducts rows)
                    dbDeleteOpenOrderByProduct(productId)
                      .then(OPdata => {
                        console.log('OPdata', OPdata);
                        resolve(
                          `${blue(`\n >>Removed available quantity of #${productId} and removed from open orders<<`)}`
                        );
                      })
                      .catch(err => {
                        return reject('\nBack to Main Menu', err);
                      });
                  })
                  .catch(err => {
                    return reject('\nBack to Main Menu', err);
                  });
              } else {
                return reject(`${red('\n >>Removing product unsuccessfull; database error, please contact admin<<')}`);
              }
            });
          }
        }
      );
    });
  });
};
