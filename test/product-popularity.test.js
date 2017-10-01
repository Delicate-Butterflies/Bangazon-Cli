require('dotenv').config();
const { assert } = require('chai');
const { getPopularProducts } = require('../app/models/Order-Product.js');
const { createTables, insertRows } = require('../db/buildDB');

let TIMEOUT = process.env.TIMEOUT;

describe('see top 3 overall popular product', () => {
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      return insertRows();
    });
  });
  it('should be a function', () => {
    assert.isFunction(getPopularProducts);
  });

  it('should return an array', () => {
    return getPopularProducts().then(data => {
      assert.isArray(data);
    });
  });

  it('should return array of length 3', () => {
    return getPopularProducts().then(data => {
      let expected = 3;
      assert.equal(data.length, expected);
    });
  });
});
