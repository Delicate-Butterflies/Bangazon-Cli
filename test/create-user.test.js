require('dotenv').config();

const { assert: { equal, isFunction, isObject, isNotOk } } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { getUser, saveNewUser } = require('../app/models/user.js');

let TIMEOUT = process.env.TIMEOUT;

// Placed here to confirm test file runs properly
describe('create a user', () => {
	after(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			// console.log('Create Then', msg);
			return insertRows();
		});
	});
	describe('get a user', () => {
		it('is a function', () => {
			isFunction(getUser);
		});
		it('should return an object', () => {
			return getUser(1).then(data => {
				console.log('this one', data);
				isObject(data);
			});
		});
	});
});

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
