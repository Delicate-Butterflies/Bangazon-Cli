'use strict';

const prompt = require('prompt');
const { dbGetAllProductsBySellerID } = require('../models/Product');

module.exports.promptUpdateProdInfo = seller_ID => {
  dbGetAllProductsBySellerID(seller_ID)
    .then(sellerProdsArray => {
      console.log('Select a product to update.');
      sellerProdsArray.forEach(function(product) {
        console.log(`${product.id}. ${product.title}`);
      });
    })
    .catch(err => {
      console.log(err);
    });
};
