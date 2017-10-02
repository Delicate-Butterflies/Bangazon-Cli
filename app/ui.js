'use strict';
/* eslint-disable no-console */

// 3rd party libs
const { red, magenta } = require('chalk');
const prompt = require('prompt');
prompt.message = blue('Bangazon Corp');

// app modules
const { promptPrintUsers } = require('./controllers/active-user-ctrl');
const { setActiveCustomer, getActiveCustomer, getDetailedActiveCustomer } = require('./activeCustomer');
const { promptAddPayment, addPaymentType } = require('./controllers/add-payment-type-ctrl');
const { promptNewUser } = require('./controllers/user-ctrl');
const { promptNewProduct } = require('./controllers/user-add-product-ctrl');
const { displayPopularProducts } = require('./controllers/popular-product-ctrl');
const { sellerRevenueReport } = require('./controllers/user-revenue-ctrl');
const { promptAddToOrder } = require('./controllers/add-to-order-ctrl');
const { promptCompleteOrder } = require('./controllers/complete-order-ctrl.js');
const { removeUserProduct } = require('./controllers/remove-user-product-ctrl');

prompt.start();

function noActiveCustomerError() {
	console.log(`\n ${red('>> No Customer. Please select customer (#2) or create new customer (#1) <<')}`);
	module.exports.displayWelcome();
}

let mainMenuHandler = userInput => {
	switch (userInput.choice) {
		case '1':
			promptNewUser().then(() => {
				// saves customer to db
				module.exports.displayWelcome();
			});
			break;
		case '2':
			promptPrintUsers().then(userData => {
				if (userData.exists == true) {
					setActiveCustomer(userData.activeUser, userData.userName);
				} else console.log(`\n ${red('>> No such Customer. Please select from the list or create a new Customer <<')}`);
				module.exports.displayWelcome();
			});

			break;

		case '3':
			if (getActiveCustomer() == null) {
				noActiveCustomerError();
			} else {
				promptAddPayment().then(custData => {
					let activeUser = getActiveCustomer();
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
				noActiveCustomerError();
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
				noActiveCustomerError();
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
			if (getActiveCustomer() == null) {
				noActiveCustomerError();
			} else {
				promptCompleteOrder(getActiveCustomer())
					.then(data => {
						console.log(data);
						module.exports.displayWelcome();
					})
					.catch(error => {
						console.log(error);
						module.exports.displayWelcome();
					});
			}
			break;

		case '7':
			if (getActiveCustomer() == null) {
				noActiveCustomerError();
			} else
				removeUserProduct(getActiveCustomer())
					.then(data => {
						console.log(data);
						module.exports.displayWelcome();
					})
					.catch(err => {
						console.log(err);
						module.exports.displayWelcome();
					});

			break;

		case '10':
			if (getActiveCustomer() == null) {
				noActiveCustomerError();
			} else {
				sellerRevenueReport(getActiveCustomer())
					.then(data => {
						console.log(data);
						module.exports.displayWelcome();
					})
					.catch(err => {
						console.log(err);
						module.exports.displayWelcome();
					});
			}
			break;
		case '11':
			displayPopularProducts()
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
		if (getActiveCustomer() !== null)
			console.log(
				`\n ${magenta(' Current Active Customer: ')}`,
				getDetailedActiveCustomer().id,
				getDetailedActiveCustomer().name
			);
		console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to sell
  ${magenta('5.')} Add a product to shopping cart
  ${magenta('6.')} Complete an order
  ${magenta('7.')} Remove customer product
  ${magenta('8.')} Update product information
  ${magenta('9.')} Show stale products
  ${magenta('10.')} Show customer revenue report
  ${magenta('11.')} Show overall product popularity
  ${magenta('12.')} Leave Bangazon!\n`);
<<<<<<< HEAD
		prompt.get(
			[
				{
					name: 'choice',
					description: 'Please make a selection'
				}
			],
			function(err, choice) {
				if (err) return reject(err);
				else mainMenuHandler(choice);
			}
		);
	});
=======
    prompt.get(
      [
        {
          name: 'choice',
          description: 'Please make a selection'
        }
      ],
      function(err, choice) {
        if (err) return reject(err);
        else mainMenuHandler(choice);
      }
    );
  });
>>>>>>> master
};
