const { assert } = require('chai');
const { dbGetAllProductsBySellerID, dbGetSingleProduct, dbPutProduct } = require('../app/models/product.js');

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
  describe('dbGetSingleProduct', () => {
    it('is a function', () => {
      assert.isFunction(dbGetSingleProduct);
    });
    it('returns an expected product', () => {
      let expected = {
        id: 4,
        product_type_id: 7,
        price: 93.8,
        title: 'Practical Soft Fish',
        description: 'Voluptas et culpa nobis a incidunt.',
        original_quantity: 81,
        seller_user_id: 1
      };
      return dbGetSingleProduct(4).then(data => {
        assert.deepEqual(data, expected);
      });
    });
  });
  describe('dbPutProduct', () => {
    it('is a function', () => {
      assert.isFunction(dbPutProduct);
    });
    it('updates a specific product', () => {
      let expected = {
        id: 10,
        product_type_id: 4,
        price: 57.1,
        title: 'Large Soft Cheese',
        description: 'it is tasty',
        original_quantity: 99,
        seller_user_id: 1
      };
      return dbPutProduct({ body: { title: 'Large Soft Cheese', description: 'it is tasty', original_quantity: 99 } }, 10)
        .then(() => {
          return dbGetSingleProduct(10);
        })
        .then((data) => {
          assert.deepEqual(data, expected);
        });
    });
  });
});
