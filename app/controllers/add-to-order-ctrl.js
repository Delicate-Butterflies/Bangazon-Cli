'use strict';

const prompt = require('prompt');
const { dbGetAllProducts } = require('../models/Product');
const { dbPostOrderProduct } = require('../models/Order-Product');
const { dbGetOpenOrderByUser, dbPostOrder } = require('../models/Order');

//gets all products, lists them, and prompts user to type an id and then quantity
//TODO: Doing way too much in this one function
module.exports.promptAddToOrder = userId => {
  return new Promise((resolve, reject) => {
    console.log("Press ctrl+'c' to go back to main menu at any point");
    dbGetAllProducts().then(prodArr => {
      for (let i = 0; i < prodArr.length; i++) {
        console.log(`${prodArr[i].id}: ${prodArr[i].title}, ${prodArr[i].description}`);
      }
      prompt.get(
        [
          {
            name: 'product',
            description: 'Choose a product ID to add to the order'
          },
          {
            name: 'quantity',
            description: 'How many do you want? (number)'
          }
        ],
        function(err, results) {
          if (err) return reject('\nBack to Main Menu', err);
          dbGetOpenOrderByUser(userId)
            .then(openOrderObj => {
              if (!openOrderObj) {
                //using our current data, this part of the if() will never get hit, need to update db:reset
                //customer ID 4 has it for now
                dbPostOrder(userId, 'null', results.product)
                  .then(order => {
                    return dbPostOrderProduct(order.id, results.product, results.quantity);
                  })
                  .then(postOrderProductResponse => {
                    resolve(postOrderProductResponse);
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                dbPostOrderProduct(openOrderObj.id, results.product, results.quantity)
                  .then(postOrderProductResponse => {
                    resolve(postOrderProductResponse);
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            })
            .catch(err => {
              reject(err);
            });
        }
      );
    });
  });
};
