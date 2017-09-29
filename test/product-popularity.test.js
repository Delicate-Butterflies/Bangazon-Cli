const { assert } = require('chai');
const { getPopularProducts } = require('../app/models/Order-Product.js');

describe('see top 3 overall popular product', () => {
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
