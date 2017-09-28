'use strict';

const prompt = require('prompt');
const { dbOrderTotal, dbGetOpenOrderByUser, dbPutOrder } = require('../models/Order.js');
const { dbGetUsersPaymentTypes } = require('../models/Payment-Types.js');

module.exports.promptCompleteOrder = userId => {
  return new Promise((resolve, reject) => {
    // returns order object, active user id is passed in
    dbGetOpenOrderByUser(userId).then(data => {
      let orderId = data.id;
      //if there are no products in the customer's open order
      if (data == undefined) {
        console.log('Please add some products to your order first. Press any key to return to main menu.');
        prompt.get(
          [
            {
              name: 'anyKey',
              pattern: /^[-@./#&+ws]*{2}$/
            }
          ],
          function(err, results) {
            if (err) return reject(err);
            resolve('Return to main menu.');
          }
        );
      } else {
        //if there are products in the customers open order
        dbOrderTotal(orderId).then(orderTotal => {
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
              console.log('results', results.purchaseAnswer);
              if (err) return reject(err);
              if (results.purchaseAnswer == 'y' || results.purchaseAnswer == 'Y') {
                promptChoosePaymentOption(userId, orderId);
              } else {
                return reject('You selected no. Return to main menu.');
              }
            }
          );
        });
      }
    });
  });
};

// if user enters Y
function promptChoosePaymentOption(userId, orderId) {
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
        console.log('order id for put payment', orderId);
        console.log('results of payment choice for put payment', results.paymentChoice);
        dbPutOrder(orderId, { payment_type_id: results.paymentChoice }).then(data => {
          resolve({ message: 'update successful', rows_updated: this.changes });
        });
      }
    );
  });
}