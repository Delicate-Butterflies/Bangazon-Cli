'use strict';

const prompt = require('prompt');
const { displayWelcome } = require('../app/ui.js');
const { dbOrderTotal } = require('../app/models/Order.js');
const { dbGetUsersPaymentTypes } = require('../app/models/Payment-Types.js');

module.exports.promptCompleteOrder = () => {
  return new Promise((resolve, reject) => {
    //method to be written by Josh to return open order for specific user
    dbGetOrderByUser()
    .then( (data) => {
      let openOrder = data;
    })

    // if there are no products
    console.log('Please add some products to your order first. Press any key to return to main menu.');
    // if there are products in the order
    let orderTotal = dbOrderTotal();
    console.log(`Your order total is ${orderTotal}. Ready to purchase?`);
    prompt.get([
      {
        name: 'purchaseAnswer',
        description: '(Y/N)'
      }
    ]), function(err, results) {
      if (err) return reject(err);
      if (results.purchaseAnswer == ('Y' || 'y') {
        promptChoosePaymentOption();
      } else {
        displayWelcome();
      }
    });
  });
};

// if user enters Y
promptChoosePaymentOption = () => {
  dbGetUsersPaymentTypes().then(data => {
    console.log('Choose a payment option');
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id}: ${data[i].type}`);
    }
    prompt.get([
      {
        name: 'paymentChoice',
        description: 'Choose a payment type'
      }
    ]), function(err, results) {
      if (err) return reject(err);
      resolve(results);
    }
  })
}
