require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbGetAllStaleProducts, dbGetUsersStaleProducts } = require('../app/models/Product');

describe('Show stale products', () => {
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      return insertRows();
    });
  });
  describe('dbGetAllStaleProducts', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetAllStaleProducts);
    });
    it('should return an array', () => {
      return dbGetAllStaleProducts().then(data => {
        assert.isArray(data);
      });
    });
  });
  describe('dbGetUsersStaleProducts', () => {
    it('should be a function', () => {
      assert.isFunction(dbGetUsersStaleProducts);
    });
    it('should return an array', () => {
      return dbGetUsersStaleProducts(1).then(data => {
        assert.isArray(data);
      });
    });
  });
});
