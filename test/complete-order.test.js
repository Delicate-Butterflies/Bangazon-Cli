require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbGetUsersPaymentTypes } = require('../app/models/Payment-Types.js');
const { dbGetOneOrder, dbGetOpenOrderByUser, dbOrderTotal, dbPutOrder } = require('../app/models/Order.js');

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

    it('should return the order total', () => {
      return dbOrderTotal(7).then(data => {
        assert.strictEqual(data, 196.6);
      });
    });
  });

  describe('dbGetUsersPaymentTypes', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetUsersPaymentTypes);
    });

    it('should return an array', () => {
      return dbGetUsersPaymentTypes(3).then(data => {
        assert.isArray(data);
      });
    });
  });

  describe('dbPutOrder', () => {
    let expected = {
      payment_type_id: 56
    };
    it('should be a function', () => {
      assert.isFunction(dbPutOrder);
    });

    it('should return a string', () => {
      return dbPutOrder(3, expected).then(data => {
        assert.isString(data);
      });
    });

    it('should add updated payment type to db', () => {
      return dbPutOrder(3, expected).then(paymentAdded => {
        dbGetOneOrder(3).then(newPayment => {
          assert.equal(expected.payment_type_id, newPayment.payment_type_id);
        });
      });
    });
  });
});
