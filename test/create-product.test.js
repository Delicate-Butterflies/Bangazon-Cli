const { assert } = require('chai');
// const { getActiveCustomer } = require('../app/activeCustomer.js');
const { promptNewProduct } = require('../app/controllers/user-add-product-ctrl');

describe('Add a product', () => {
  it('is a function', () => {
    assert.isFunction(promptNewProduct);
  });
  // it('', () => {

  // });
});
