'use strict';

// 3rd party libs
const { red, magenta, blue } = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue('Bangazon Corp');

// app modules
const { promptNewCustomer } = require('./controllers/customerCtrl');
const { promptAddPayment } = require('./controllers/add-payment-type-ctrl');

const db = new Database('./db/bangazon.sqlite');

prompt.start();

let mainMenuHandler = (err, userInput) => {
  console.log('user input', userInput);
  // This could get messy quickly. Maybe a better way to parse the input?
  switch (userInput.choice) {
    case '3':
      promptAddPayment().then(custData => {
        console.log('customer data to save', custData);
      });
      break;
    default:
      console.log('Invalid Selection');
      module.exports.displayWelcome();
  }
};

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`;
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Leave Bangazon!`);
    prompt.get(
      [
        {
          name: 'choice',
          description: 'Please make a selection'
        }
      ],
      mainMenuHandler
    );
  });
};
