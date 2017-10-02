const { assert } = require('chai');
const { dbGetAllProductsBySellerID, dbGetSingleProduct, dbPutProduct, dbCheckForProductSales } = require('../app/models/Product');

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
        id: 31,
        product_type_id: 10,
        price: 98.3,
        title: 'Rustic Fresh Gloves',
        description: 'In nihil qui animi ipsa maiores non atque et.',
        original_quantity: 51,
        seller_user_id: 6,
        created_on: '2017-02-11T03:07:21.035Z'
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
        seller_user_id: 1,
        created_on: '2016-11-29T08:16:03.439Z'
      };
      return dbGetSingleProduct(4).then(data => {
        assert.deepEqual(data, expected);
      });
    });
  });
  describe('dbCheckForProductSales', () => {
    it('should get the original amount and ammount sold', () => {
      return dbCheckForProductSales(10)
        .then((productQuantities) => {
          assert.propertyVal(productQuantities, 'original_quantity', 94);
          assert.propertyVal(productQuantities, 'sold', 11);
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
        seller_user_id: 1,
        created_on: '2017-09-30T03:07:21.035Z'
      };
      return dbPutProduct({ title: 'Large Soft Cheese', description: 'it is tasty', original_quantity: 99 }, 10)
        .then(() => {
          return dbGetSingleProduct(10);
        })
        .then((data) => {
          assert.deepEqual(data, expected);
        });
    });
  });
});
