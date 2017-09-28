require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbGetUsersPaymentTypes } = require('../app/models/Payment-Types.js');
const { dbGetOpenOrderByUser, dbOrderTotal, dbPutOrder } = require('../app/models/Order.js');
// const { getActiveCustomer } = require('../app/activeCustomer.js');

describe('user can complete customer order', () => {
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      return insertRows();
    });
  });
  describe('dbGetOpenOrderByUser', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetOpenOrderByUser);
    });

    it('should return an object', () => {
      return dbGetOpenOrderByUser('1').then(data => {
        assert.isObject(data);
      });
    });
  });

  describe('dbOrderTotal', () => {
    it('should be a function', () => {
      assert.isFunction(dbOrderTotal);
    });

    it('should return a number', () => {
      return dbOrderTotal(3).then(data => {
        assert.isNumber(data);
      });
    });
  });

  describe('dbGetUsersPaymentTypes', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetUsersPaymentTypes);
    });

    it('should be an array', () => {
      return dbGetUsersPaymentTypes(3).then(data => {
        assert.isArray(data);
      });
    });
  });

  describe('dbPutOrder', () => {
    it('should be a function', () => {
      assert.isFunction(dbPutOrder);
    });

    it('should return a string', () => {
      let order = {
        payment_type_id: 56
      };
      return dbPutOrder(3, order).then(data => {
        assert.isString(data);
      });
    });
  });
});
