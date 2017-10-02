require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;
//
const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetSingleProduct, dbPostProduct } = require('../app/models/Product');
const { promptNewProduct } = require('../app/controllers/user-add-product-ctrl');

const productObj = {
	id: null,
	product_type_id: 3,
	price: 5,
	title: 'Rubber Duck',
	description: 'Its a duck',
	original_quantity: 5,
	seller_user_id: 3,
	created_on: '2017-05-24T03:04:11.035Z'
};

// start of testing
describe('Adding a product', () => {
	// Reset the db
	before(function() {
		this.timeout(TIMEOUT);
		return createTables().then(() => {
			return insertRows();
		});
	});
	// testing product GET method
	describe('get a product from db', () => {
		it('is a function', () => {
			assert.isFunction(dbGetSingleProduct);
		});
		it('returns an object', () => {
			return dbGetSingleProduct(1).then(data => {
				assert.isObject(data);
			});
		});
		it('returns a product object', () => {
			return dbGetSingleProduct(1).then(data => {
				console.log(data);
				assert.hasAllKeys(data, productObj);
			});
		});
	});
	// testing product POST method
	describe('post a product to db', () => {
		it('is a function', () => {
			assert.isFunction(dbPostProduct);
		});
		it('returns an object after a post', () => {
			return dbPostProduct(productObj).then(response => {
				assert.isObject(response);
			});
		});
		it('returns a response object after a post', () => {
			return dbPostProduct(productObj).then(response => {
				assert.hasAllKeys(response, ['id', 'message']);
			});
		});
		it('posts to the db', () => {
			return dbPostProduct(productObj).then(response => {
				productObj.id = response.id;
				return dbGetSingleProduct(response.id).then(response => {
					assert.deepEqual(response, productObj);
				});
			});
		});
	});
	// running what tests on the prompt function we can
	describe('prompt for new product', () => {
		it('is a function', () => {
			assert.isFunction(promptNewProduct);
		});
	});
});
