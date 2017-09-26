'use strict';

const prompt = require('prompt');

module.exports.promptAddPayment = () => {
  return new Promise((resolve, reject) => {
    prompt.get(
      [
        {
          name: 'paymentType',
          pattern: /^[a-zA-Z\s\-]+$/,
          description: 'Enter payment type (visa, amex, etc)',
          message: 'payment type must be letters',
          type: 'string',
          required: true
        },
        {
          name: 'accountNumber',
          description: 'Enter Account Number(16 digits)',
          pattern: /^(\d{16})$/,
          type: 'number',
          message: 'account number must be 16 digits long',
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
