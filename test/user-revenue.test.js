require('dotenv').config();
// let { readFileSync } = require('fs');

const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbSellerRevenue } = require('../app/models/User.js');
// const { promptNewUser } = require('../app/controllers/user-ctrl');

let TIMEOUT = process.env.TIMEOUT;

// let dbUsers = JSON.parse(readFileSync('db/json/users.json'));

// let newUserObj = {
// 	city_address: 'Nashville',
// 	first_name: 'Jon',
// 	last_name: 'Roberts',
// 	state_code: 'TN',
// 	street_address: '555 Shady Ln',
// 	zip_code: '37216'
// };

describe('Getting user sales revenue:', () => {
	before(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			return insertRows();
		});
	});
	describe('pass current user id get seller revenue', () => {
		describe('dbSellerRevenue()', () => {
			it('is a function', () => {
				assert.isFunction(dbSellerRevenue);
			});
			it('should return an object', () => {
				return dbSellerRevenue(1).then(data => {
					assert.isObject(data);
				});
			});
			// it('should get correct user info', () => {
			// 	return dbSellerRevenue(1).then(data => {
			//     assert.deepEqual(data, );
			//     // not sure what to compare here
			// 	});
			// });
		});
		describe('promptUserRevenue', () => {
			// it('should return correct data from db', () => {
			// 	// prompt info is input to dbPostUser, test info from dbGetUser is the same
			// 	return dbPostUser(newUserObj).then(postData => {

			// 	});
			// });
			it('should pass error', () => {
				// TODO - how to test?
			});
		});
	});
});
