'use strict';

const prompt = require('prompt');

module.exports.promptCompleteOrder = () => {
  return new Promise((resolve, reject) => {
    // if there are no products
    prompt.get([
      {
        message: 'Please add some products to your order first. Press any key to return to main menu.'
      }
    ]);
    // if there are products in the order
    prompt.get  , function(err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
