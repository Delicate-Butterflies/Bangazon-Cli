require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbSellerRevenue } = require('../app/models/User.js');

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
    //   // exported from db browser for user id 1
    //   let expected = [
    //     {
    //       order_id: 69,
    //       price: 93.8,
    //       quantity: 5,
    //       title: 'Practical Soft Fish',
    //       first_name: 'Brandon',
    //       last_name: 'Walker'
    //     },
    //     {
    //       first_name: 'Brandon',
    //       last_name: 'Walker',
    //       title: 'Small Wooden Cheese',
    //       price: 57.1,
    //       quantity: 2,
    //       order_id: 42
    //     },
    //     {
    //       first_name: 'Brandon',
    //       last_name: 'Walker',
    //       title: 'Practical Soft Fish',
    //       price: 93.8,
    //       quantity: 1,
    //       order_id: 84
    //     },
    //     {
    //       first_name: 'Brandon',
    //       last_name: 'Walker',
    //       title: 'Small Wooden Cheese',
    //       price: 57.1,
    //       quantity: 5,
    //       order_id: 85
    //     }
    //   ];
    //   return dbSellerRevenue(1).then(data => {
    //     assert.deepEqual(data, expected);
    //   });
    // });
  });
  // describe('promptUserRevenue', () => {
  // 	it('should pass error', () => {
  // 		// TODO - how to test?
  // 	});
  // });
});
