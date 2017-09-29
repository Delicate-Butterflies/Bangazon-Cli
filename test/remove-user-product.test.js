require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbCheckForProductSales, dbDeleteProduct, dbGetSingleProduct } = require('../app/models/Product.js');

describe('Removing user product:', () => {
	before(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			return insertRows();
		});
	});
	describe('dbCheckForProductSales()', () => {
		it('is a function', () => {
			assert.isFunction(dbCheckForProductSales);
		});
		it('should return an object', () => {
			return dbCheckForProductSales(1).then(data => {
				assert.isObject(data);
			});
		});
		it('should get correct product info', () => {
			// exported from db browser for user id 1
			let expected = {
				sold: 15,
				original_quantity: 88
			};
			return dbCheckForProductSales(1).then(productData => {
				assert.deepEqual(productData, expected);
			});
		});
	});
	describe('dbDeleteProduct', () => {
		it('should be a function', () => {
			assert.isFunction(dbDeleteProduct);
		});
		it('should delete product - dbGetSingleProduct return null', () => {
			let deleteId = 1;
			return dbDeleteProduct(deleteId).then(() => {
				return dbGetSingleProduct(deleteId).then(data => {
					assert.isUndefined(data);
				});
			});
		});
	});
});
