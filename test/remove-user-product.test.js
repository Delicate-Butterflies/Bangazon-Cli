require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');

const {
	dbCheckForProductSales,
	dbDeleteProduct,
	dbGetSingleProduct,
	dbPostProduct
} = require('../app/models/Product.js');
const { dbDeleteOpenOrderByProduct } = require('../app/models/Order-Product');
const { removeUserProduct } = require('../app/controllers/remove-user-product-ctrl.js');

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
	describe('removeUserProduct (ctrl)', () => {
		it('should be a function', () => {
			assert.isFunction(removeUserProduct);
		});
		// the following will not currently return any products with current db setup - see models/Products
		it('should return confirmation message on delete', () => {
			let newProduct = {
				product_type_id: 1,
				price: 10.1,
				title: 'Tasty Test Product',
				description: 'This new product is super tasty',
				original_quantity: 5,
				seller_user_id: 1
			};
			return dbPostProduct(newProduct).then(({ id }) => {
				let expected = `Product id ${id} removed`;
				return removeUserProduct(id).then(data => {
					assert.equal(data, expected);
				});
			});
		});
		it('should not remove product attached to closed order', () => {
			let expected = `Cannot remove product, it is associated with orders`;
			return removeUserProduct(2).then(data => {
				assert.equal(data, expected);
			});
		});
		it('should delete any ordersProducts rows from open order', () => {
			return dbDeleteOpenOrderByProduct(4).then(data => {
				assert.equal(data.rows_deleted, 5);
			});
		});
	});
});
