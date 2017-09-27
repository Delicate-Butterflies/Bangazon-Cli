'use strict';

const prompt = require('prompt');
const { displayWelcome } = require('../ui.js');
const { dbOrderTotal, dbGetOpenOrderByUser } = require('../models/Order.js');
const { dbGetUsersPaymentTypes } = require('../models/Payment-Types.js');
const { getActiveCustomer } = require('../activeCustomer');

module.exports.promptCompleteOrder = userId => {
  return new Promise((resolve, reject) => {
    // returns order object, active user id is passed in
    dbGetOpenOrderByUser(userId)
    .then( (data) => {
      // save order id
    //if there are no products
    if (data == undefined) {
      console.log('Please add some products to your order first. Press any key to return to main menu.');
      prompt.get([
        {
          name: 'anyKey',
          pattern: '/^[-@./#&+ws]*{2}$/'
        }
      ]),
        function(err, results) {
          if (err) return reject(err);
          displayWelcome();
        };
    } else {
      //if there are products in the order
      dbOrderTotal()
      .then ( (orderTotal) => {
        console.log(`Your order total is ${orderTotal}. Ready to purchase?`);
        prompt.get([
          {
            name: 'purchaseAnswer',
            description: '(Y/N)',
            pattern: '^(?:Y|N)$'
          }
        ]),
          function(err, results) {
            if (err) return reject(err);
            if (results.purchaseAnswer == ('Y' || 'y')) {
              promptChoosePaymentOption();
            } else {
              displayWelcome();
            }
          };
        }
      })
    })

// if user enters Y
function promptChoosePaymentOption() {
  dbGetUsersPaymentTypes(userId)
  .then( (data) => {
    console.log('Choose a payment option');
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id}: ${data[i].type}`);
    }
    prompt.get([
      {
        name: 'paymentChoice',
        description: 'Choose payment id'
      }
    ]),
      function(err, results) {
        if (err) return reject(err);
        dbPutOrder(orderId, results.paymentChoice)
        .then( (data) => {
          resolve(data);
          displayWelcome();
        })
      };
  });
}
