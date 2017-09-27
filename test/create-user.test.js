require('dotenv').config();

const { assert: { equal, isFunction, isObject, isNotOk } } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetOneUser } = require('../app/models/User.js');

let TIMEOUT = process.env.TIMEOUT;

// Placed here to confirm test file runs properly
// describe('create a user', () => {
// 	before(function() {
// 		this.timeout(TIMEOUT);
// 		return createTables().then(() => {
// 			// console.log('Create Then', msg);
// 			return insertRows();
// 		});
// 	});
// 	describe('get a user', () => {
// 		it('is a function', () => {
// 			isFunction(dbGetOneUser);
// 		});
// 		it('should return an object', () => {
// 			return dbGetOneUser(1).then(data => {
// 				// console.log('this one', data[0]);
// 				isObject(data[0]);
// 			});
// 		});
// 	});
// });

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
