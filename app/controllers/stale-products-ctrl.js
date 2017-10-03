'use strict';
/* eslint-disable no-console */

// require modules
const prompt = require('prompt');

const { dbGetAllStaleProducts, dbGetUsersStaleProducts } = require('../models/Product');

// start prompt
module.exports.promptStaleProductsChoice = userId => {
  return new Promise((resolve, reject) => {
    console.log("Press ctrl+'c' to go back to main menu at any point");
    console.log('What whould you like to view?');
    console.log('1. All stale products.');
    console.log('2. Your stale products.');
    prompt.get(
      [
        {
          name: 'stale_products_choice',
          description: 'Enter 1 or 2',
          pattern: '^([1-2])$',
          message: 'Answer must be a 1 or 2',
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        let userChoice = results.stale_products_choice;
        if (userChoice === '1') {
          dbGetAllStaleProducts().then(data => {
            if (data == undefined) {
              console.log('There are no stale products at this time. Press any key to return to main menu.');
              //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
              process.stdin.setRawMode(true);
              process.stdin.resume();
              process.stdin.on('data', () => {
                resolve('Return to main menu.');
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                console.log(`${data[i].id}: ${data[i].title}`);
              }
            }
          });
        } else {
          dbGetUsersStaleProducts(userId).then(data => {
            if (data.length == 0) {
              console.log('You have no stale products at this time. Press any key to return to main menu.');
              //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
              process.stdin.setRawMode(true);
              process.stdin.resume();
              process.stdin.on('data', () => {
                resolve('Return to main menu.');
              });
            } else {
              for (let i = 0; i < data.length; i++) {
                console.log(`${data[i].id}: ${data[i].title}`);
              }
            }
          });
        }
        console.log('Press any key to return to main menu.');
        //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => {
          resolve('Return to main menu.');
        });
      }
    );
  });
};
