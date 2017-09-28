require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbSellerRevenue } = require('../app/models/User.js');
const { promptNewUser } = require('../app/controllers/user-ctrl');

describe('Getting user sales revenue:', () => {
	before(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			return insertRows();
		});
	});
	describe('dbSellerRevenue()', () => {
		it('is a function', () => {
			assert.isFunction(dbSellerRevenue);
		});
		it('should return an array', () => {
			return dbSellerRevenue(1).then(data => {
				assert.isArray(data);
			});
		});
		// it('should get correct user info', () => {
		// 	return dbSellerRevenue(1).then(data => {
		//     // TODO not sure what to compare here
		// 	});
		// });
	});
	// describe('promptUserRevenue', () => {
	// 	it('should pass error', () => {
	// 		// TODO - how to test?
	// 	});
	// });
});
