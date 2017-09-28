require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbPostPaymentType, dbGetOnePaymentType, dbDeleteOnePaymentType } = require('../app/models/Payment-Types.js');

describe('post new user payment type', () => {
	before(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			return insertRows();
		});
	});
	let paymentTypeObj = {
		customer_user_id: 3,
		type: 'visa',
		account_number: 1234123412341234
	};
	describe('getOnePaymentType', () => {
		it('should be a function', () => {
			assert.isFunction(dbGetOnePaymentType);
		});

		it('should return an object', () => {
			return dbGetOnePaymentType(3).then(data => {
				assert.isObject(data);
			});
		});

		describe('postPaymentType', () => {
			it('should be a function', () => {
				assert.isFunction(dbPostPaymentType);
			});

			it('should add new payment type and should have expected id', () => {
				let expected = 176;
				return dbPostPaymentType(paymentTypeObj).then(data => {
					assert.equal(data.id, expected);
					return dbDeleteOnePaymentType(data.id);
				});
			});

			it('should confirm that the data is added by using getter', () => {
				let expected = {
					customer_user_id: 3,
					type: 'visa',
					account_number: 1234123412341234
				};
				return dbPostPaymentType(paymentTypeObj).then(data => {
					dbGetOnePaymentType(data.new_payment_type_id).then(receivedData => {
						// console.log(receivedData);
						assert.deepEqual(receivedData, expected);
						dbDeleteOnePaymentType(data.new_payment_type_id);
					});
				});
			});
		});
	});
});
