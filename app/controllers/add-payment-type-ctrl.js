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
          type: 'string',
          required: true
        },
        {
          name: 'accountNumber',
          description: 'Enter Account Number(16 digits)',
          type: 'number',
          conform: function(accountNumber) {
            if (accountNumber.length > 16) return 'a/c number greater than 16';
          },
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
