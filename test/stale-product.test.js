require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;
//
const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
// const { promptShowStale } = require('../app/controllers/stale-products-ctrl');
const { dbGetAllProductsByUser, dbGetStaleProductsByCriteriaTwo } = require('../app/models/Product');

// start of testing
describe('Show stale products', () => {
  // Reset the db
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      return insertRows();
    });
  });
  // testing getting all of a users products
  describe('get ALL of a users products', () => {
    it('is a function', () => {
      assert.isFunction(dbGetAllProductsByUser);
    });
    it('returns an array', () => {
      return dbGetAllProductsByUser(1).then(response => {
        assert.isArray(response);
      });
    });
    it('returns an array of objects', () => {
      return dbGetAllProductsByUser(1).then(response => {
        response.forEach(product => {
          assert.isObject(product);
        });
      });
    });
  });
  // it('returns an array of product objects', () => {
  //   return dbGetAllProductsByUser(1).then(response => {
  //     response.forEach(product => {
  //       assert.deepHas
  //     })
  //   })
  // })
  describe('get stale products by criteria two', () => {
    it('is a function', () => {
      assert.isFunction(dbGetStaleProductsByCriteriaTwo);
    });
    it('returns an array', () => {
      return dbGetStaleProductsByCriteriaTwo(1).then(response => {
        assert.isArray(response);
      });
    });
    it('returns an array of objects', () => {
      return dbGetStaleProductsByCriteriaTwo(1).then(response => {
        response.forEach(product => {
          assert.isObject(product);
        });
      });
    });
    it('returns an array of objects with product titles', () => {
      return dbGetStaleProductsByCriteriaTwo(1).then(response => {
        response.forEach(product => {
          assert.hasAllKeys(product, ['title'], 'wheres this message end up');
        });
      });
    });
    it("returns an array of user's objects that have been added to an order", () => {
      return dbGetStaleProductsByCriteriaTwo(1).then(response => {
        assert.deepEqual(response, [{ title: 'Small Wooden Cheese' }, { title: 'Practical Soft Fish' }]);
      });
    });
    it("returns an array of user's objects that have been added to an incomplete order", () => {
      return dbGetStaleProductsByCriteriaTwo(1).then(response => {
        assert.deepEqual(response, [{ title: 'Practical Soft Fish' }]);
      });
    });
  });
});
