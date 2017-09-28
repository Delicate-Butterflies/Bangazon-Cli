require('dotenv').config();
const TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetAllProducts } = require('../app/models/Product');
const { dbPostOrderProduct } = require('../app/models/Order-Product');
const { dbGetOpenOrderByUser, dbPostOrder } = require('../app/models/Order');

describe('Add product to customer order', () => {
  beforeEach(function () {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      // console.log('Create Then', msg);
      return insertRows();
    });
  });
  describe('dbGetAllProducts', () => {
    it('is a function', () => {
      assert.isFunction(dbGetAllProducts);
    });
    it('should return an array', () => {
      return dbGetAllProducts()
        .then((data) => {
          assert.isArray(data);
        });
    });
    it('is 50 products', () => {
      return dbGetAllProducts()
        .then((data) => {
          assert.lengthOf(data, 50);
        });
    });
    it('object on array has certain keys', () => {
      return dbGetAllProducts()
        .then((data) => {
          assert.containsAllKeys(data[49], ['id', 'product_type_id', 'price', 'title', 'description', 'original_quantity', 'seller_user_id']);
        });
    });
  });
  describe('dbGetOpenOrderByUser', () => {
    it('is a function', () => {
      assert.isFunction(dbGetOpenOrderByUser);
    });
    it('returns an object with an expected property and value', () => {
      return dbGetOpenOrderByUser(20)
        .then((data) => {
          assert.propertyVal(data, 'order_date', '2017-08-07T02:07:33.664Z');
        });
    });
  });
  describe('dbPostOrder', () => {
    //reminder: customer 4 is the only one without an open order
    //reminser: db:reset sets order quantity to 100
    it('is a function', () => {
      assert.isFunction(dbPostOrder);
    });
    it('should create an order number 101', () => {
      return dbPostOrder(4, 'null', 50)
        .then((data) => {
          //returns id of order created
          assert.strictEqual(data, 101);
        })
    });
  });
  describe('dbPostOrderProduct', () => {
    it('is a function', () => {
      assert.isFunction(dbPostOrderProduct);
    });
    it('should update the product quantity on an order', () => {
      //order 61 currently contains 18 but we will change that to 3
      return dbPostOrderProduct(61, 18, 3)
        .then((data) => {
          assert.strictEqual(data, '3 quantity of product 18 added to order 61');
        });
    })
  });
});