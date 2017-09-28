const { assert } = require('chai');
const { dbGetAllProductsBySellerID } = require('../app/models/product.js');

describe('Update product information', () => {
  describe('dbGetAllProductsBySellerID', () => {
    it('is a function', () => {
      assert.isFunction(dbGetAllProductsBySellerID);
    });
    it('returns an array of products', () => {
      return dbGetAllProductsBySellerID(1).then(data => {
        assert.isArray(data);
      });
    });
    it('returns expexted content, which is products', () => {
      let expected = {
        id: 1,
        product_type_id: 5,
        price: 94.3,
        title: 'Awesome Wooden Chair',
        description: 'Similique aspernatur ex soluta rerum quo est.',
        original_quantity: 88,
        seller_user_id: 6
      };
      return dbGetAllProductsBySellerID(6).then(data => {
        assert.deepEqual(data[0], expected);
      });
    });
  });
});
