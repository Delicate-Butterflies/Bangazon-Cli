'use strict';
/* eslint-disable no-console */
const prompt = require('prompt');
const { dbPostPaymentType } = require('../models/Payment-Types');

module.exports.promptAddPayment = () => {
  return new Promise((resolve, reject) => {
    console.log("Press ctrl+'c' to go back to main menu at any point");
    prompt.get(
      [
        {
          name: 'paymentType',
          pattern: /^[a-zA-Z]+$/, //takes only letters
          description: 'Enter payment type (visa, amex, etc)',
          message: 'payment type must be letters only',
          type: 'string',
          required: true
        },
        {
          name: 'accountNumber',
          description: 'Enter Account Number(16 digits)',
          pattern: /^(\d{16})$/, //takes only digits and exactly 16
          type: 'string',
          message: 'account number must be digits only and 16 characters long',
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject('\nBack to main Menu', err);
        resolve(results);
      }
    );
  });
};

module.exports.addPaymentType = paymentObj => {
  return new Promise((resolve, reject) => {
    dbPostPaymentType(paymentObj).then(data => {
      if (data) resolve(data);
      else reject('No data');
    });
  });
};
