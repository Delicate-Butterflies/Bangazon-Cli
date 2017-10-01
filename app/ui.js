'use strict';
/* eslint-disable no-console */

// 3rd party libs
const { red, magenta, blue } = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
prompt.message = colors.blue('Bangazon Corp');

// app modules
const { promptPrintUsers } = require('./controllers/active-user-ctrl');
const { setActiveCustomer, getActiveCustomer } = require('./activeCustomer');
const { promptAddPayment, addPaymentType } = require('./controllers/add-payment-type-ctrl');
const { promptNewUser } = require('./controllers/user-ctrl');
const { promptNewProduct } = require('./controllers/user-add-product-ctrl');
const { promptUpdateProdInfo } = require('./controllers/update-product-info-ctrl');
const { sellerRevenueReport } = require('./controllers/user-revenue-ctrl');
const { promptAddToOrder } = require('./controllers/add-to-order-ctrl');

prompt.start();

let mainMenuHandler = (err, userInput) => {
  switch (userInput.choice) {
    case '1':
      promptNewUser().then(() => {
        // saves customer to db
        module.exports.displayWelcome();
      });
      break;
    case '2':
      promptPrintUsers().then(userData => {
        setActiveCustomer(userData.activeUser);
        module.exports.displayWelcome();
      });
      break;
    case '3':
      if (getActiveCustomer().id == null) {
        console.log(`${red('>> No active user. Please select option 2 and select active customer <<')}`);
        module.exports.displayWelcome();
      } else {
        promptAddPayment().then(custData => {
          let activeUser = getActiveCustomer().id;
          let userObj = {
            customer_user_id: activeUser,
            type: custData.paymentType,
            account_number: custData.accountNumber
          };
          addPaymentType(userObj).then(() => {
            module.exports.displayWelcome();
          });
        });
      }
      break;

    case '4':
      // check if there is an active user
      if (getActiveCustomer() == null) {
        console.log(`${red('>> No active user. Please select option 2 and select active customer <<')}`);
        module.exports.displayWelcome();
      } else {
        // else run the prompt
        console.log();
        promptNewProduct().then(() => {
          console.log();
          console.log(`Your product was added!\n`);
          module.exports.displayWelcome();
        });
      }
      break;

    case '5':
      if (getActiveCustomer() === null) {
        console.log('no active customer, please select option 2 at the main menu');
        module.exports.displayWelcome();
      } else {
        promptAddToOrder(getActiveCustomer())
          .then(resolutionData => {
            console.log(resolutionData);
            module.exports.displayWelcome();
          })
          .catch(err => {
            console.log(err);
            module.exports.displayWelcome();
          });
      }
      break;
    case '6':
      console.log('Product popularity:');
      break;
    case '7':

      break;
    case '8':
      // Update product information
      // Get active user
      // If non-active user is selected, kick back to main menu for user to select an active user
      if (getActiveCustomer() == null) {
        console.log(`${red('>> No active user. Please select option 2 and select active customer <<')}`);
        module.exports.displayWelcome();
      } else {
        promptUpdateProdInfo(getActiveCustomer())
          .then((resolveFromUpdate) => {
            console.log(`${resolveFromUpdate.message}`);
            module.exports.displayWelcome();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // Note: Currently database lets customer have multiple active orders
      // Need to fix at a later time
      break;
    case '10':
      sellerRevenueReport(getActiveCustomer())
        .then(data => {
          console.log(data);
          module.exports.displayWelcome();
        })
        .catch(err => {
          console.log(err);
          module.exports.displayWelcome();
        });
      break;
    case '12':
      console.log(`Goodbye!`);
      process.exit();
      break;

    default:
      console.log('no such option');
      module.exports.displayWelcome();
      break;
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
  ${magenta('8.')} Update product information
  ${magenta('10.')} Show customer revenue report
  ${magenta('12.')} Leave Bangazon!\n`);
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
