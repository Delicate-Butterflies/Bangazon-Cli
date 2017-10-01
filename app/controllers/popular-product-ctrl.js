'use strict';
/* eslint-disable no-console */
const { getPopularProducts } = require('../models/Order-Product');
module.exports.displayPopularProducts = () => {
  let orderTotal = 0;
  let purchasersTotal = 0;
  let revenueTotal = 0;
  let starLine = '*'.repeat(61);
  return new Promise((resolve, reject) => {
    console.log('Product             Orders     Purchasers     Revenue        ');
    console.log(starLine);
    getPopularProducts().then(data => {
      if (data) {
        data.forEach(prod => {
          orderTotal += prod.total_products;
          purchasersTotal += prod.purchasers;
          revenueTotal += prod.revenue;
          if (prod.title.length > 18) {
            prod.title = prod.title.slice(0, 16).concat('... ');
          } else prod.title = prod.title.concat(' '.repeat(20 - prod.title.length));
          let lengthOfTotalProducts = prod.total_products.toString().length;
          let lengthOfPurchasers = prod.purchasers.toString().length;
          prod.total_products = prod.total_products.toString().concat(' '.repeat(11 - lengthOfTotalProducts));
          prod.purchasers = prod.purchasers.toString().concat(' '.repeat(15 - lengthOfPurchasers));
          prod.revenue = prod.revenue.toFixed(2);
          console.log(`${prod.title}${prod.total_products}${prod.purchasers}$${prod.revenue}`);
        });
        revenueTotal = revenueTotal.toFixed(2);
        console.log(starLine);
        let lengthOforderTotal = orderTotal.toString().length;
        let lengthOfpurchasersTotal = purchasersTotal.toString().length;
        orderTotal = orderTotal.toString().concat(' '.repeat(11 - lengthOforderTotal));
        purchasersTotal = purchasersTotal.toString().concat(' '.repeat(15 - lengthOfpurchasersTotal));
        console.log(`Total:              ${orderTotal}${purchasersTotal}$${revenueTotal}`);
        console.log('Press any key to continue.'); //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => {
          resolve('data');
        });
      } else return reject('No data recieved');
    });
  });
};
