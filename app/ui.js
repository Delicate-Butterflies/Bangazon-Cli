'use strict';

// 3rd party libs
const { red, magenta, blue } = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue('Bangazon Corp');

// app modules
const { promptNewUser } = require('./controllers/user-ctrl');

const db = new Database('./db/bangazon.sqlite');

prompt.start();

let mainMenuHandler = (err, userInput) => {
	console.log('user input', userInput);
	// This could get messy quickly. Maybe a better way to parse the input?
	switch (userInput.choice) {
		case '1':
			promptNewUser().then(custData => {
				//save customer to db
			});
			break;
		case '2':
			console.log('you chose', userInput.choice);
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
