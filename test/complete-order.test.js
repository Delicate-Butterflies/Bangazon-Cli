const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetUsersPaymentTypes } = require('../app/models/Payment-Types.js');
const { dbGetOpenOrderByUser, dbOrderTotal, dbPutOrder } = require('../app/models/Order.js');
const { getActiveCustomer } = require('../app/activeCustomer.js');

describe('user can complete customer order', () => {
  describe('dbGetOpenOrderByUser', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetOpenOrderByUser);
    });

    it('should return an object', () => {
      return dbGetOpenOrderByUser('1').then(data => {
        assert.isObject(data);
      });
    });

    describe('dbOrderTotal', () => {
      it('should be a function', () => {
        assert.isFunction(dbOrderTotal);
      });

      it('should return a string', () => {
        assert.isString(dbOrderTotal());
      });

      describe('dbGetUsersPaymentTypes', () => {
        it('should be a function', () => {
          assert.isFunction(dbGetUsersPaymentTypes);
        });

        it('should be an array', () => {
          assert.isArray(dbGetUsersPaymentTypes());
        });
      });
    });
  });
});
