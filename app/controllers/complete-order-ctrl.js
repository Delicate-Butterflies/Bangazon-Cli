'use strict';

const prompt = require('prompt');
const { dbOrderTotal, dbGetOpenOrderByUser, dbPutOrder } = require('../models/Order.js');
const { dbGetUsersPaymentTypes } = require('../models/Payment-Types.js');

/**
 * Checks for open orders, then prompts user to decide whether to proceed with adding a payment type
 * @param {number} userId - userId from users table representing current active user
 */
module.exports.promptCompleteOrder = userId => {
  return new Promise((resolve, reject) => {
    console.log("Press ctrl+'c' to go back to main menu at any point");
    // returns order object, active user id is passed in
    dbGetOpenOrderByUser(userId)
      .then(data => {
        //if there are no products in the customer's open order
        if (data == undefined) {
          console.log('Please add some products to your order first. Press any key to return to main menu.');
          //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
          process.stdin.setRawMode(true);
          process.stdin.resume();
          process.stdin.on('data', () => {
            resolve('Return to main menu.');
          });
        } else {
          //if there are products in the customers open order
          let orderId = data.id;
          dbOrderTotal(orderId).then(data => {
            let orderTotal = data.toFixed(2);
            console.log(`Your order total is $${orderTotal}. Ready to purchase?`);
            prompt.get(
              [
                {
                  name: 'purchaseAnswer',
                  description: '(Y/N)',
                  pattern: /[yn]/gi,
                  message: 'Answer must be Y or N',
                  required: true
                }
              ],
              function(err, results) {
                if (err) return reject('\nBack to Main Menu', err);
                if (results.purchaseAnswer == 'y' || results.purchaseAnswer == 'Y') {
                  promptChoosePaymentOption(userId, orderId)
                    .then(data => {
                      resolve(data);
                    })
                    .catch(error => {
                      return reject('\nBack to Main Menu', error);
                    });
                } else {
                  return reject('You selected no. Return to main menu.');
                }
              }
            );
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};
/**
 * Prompts the user to choose a payment type, updates order with payment type in database
 * @param {number} userId - user id from users table representing current active user to then get that user's payment types
 * @param {number} orderId - order id from orders table that will be updated with user's payment type choice
 */
// if user enters Y
function promptChoosePaymentOption(userId, orderId) {
  return new Promise((resolve, reject) => {
    dbGetUsersPaymentTypes(userId).then(data => {
      console.log('Choose a payment option');
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id}: ${data[i].type}`);
      }
      prompt.get(
        [
          {
            name: 'paymentChoice',
            description: 'Choose payment id'
          }
        ],
        function(err, results) {
          if (err) return reject(err);
          dbPutOrder(orderId, { payment_type_id: results.paymentChoice, order_date: new Date().toISOString() })
            .then(data => {
              resolve(data);
            })
            .catch(error => {
              return reject(error);
            });
        }
      );
    });
  });
}
