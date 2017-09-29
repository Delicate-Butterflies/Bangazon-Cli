'use strict';

const prompt = require('prompt');
const { dbGetAllProductsBySellerID, dbGetSingleProduct, dbPutProduct } = require('../models/Product');

module.exports.promptUpdateProdInfo = seller_ID => {
  let productUpdate = { body: {} };
  return new Promise((resolve, reject) => {
    dbGetAllProductsBySellerID(seller_ID)
      .then(sellerProdsArray => {
        console.log('Select a product to update.');
        sellerProdsArray.forEach(function (product) {
          console.log(`${product.id}. ${product.title}`);
        });
        prompt.get(
          [
            {
              name: 'productId',
              description: 'Select a product ID to update:'
            }
          ],
          function (err, results) {
            if (err) return reject(err);
            productUpdate.product_id = results.productId;
            dbGetSingleProduct(results.productId)
              .then((productData) => {
                console.log(
                  `
                1. Change Title "${productData.title}"
                2. Change Description "${productData.description}"
                3. Change Price "${productData.price}"
                4. Change Quantity "${productData.original_quantity}"
                `);
                prompt.get(
                  [
                    {
                      name: 'productProperty',
                      description: 'Select a property to update:'
                    }
                  ],
                  function (err, results) {
                    if (err) return reject(err);
                    results.productProperty--;
                    let columnNameArr = ['title', 'description', 'price', 'original_quantity'];
                    productUpdate.body[columnNameArr[results.productProperty]] = ' ';
                    // console.log('productUpdate', productUpdate);
                    let columnToUpdate = columnNameArr[results.productProperty];
                    let choiceTextArr = ['Title', 'Description', 'Price', 'Quantity'];
                    prompt.get(
                      [
                        {
                          name: 'productPropertyValue',
                          description: `Enter New ${choiceTextArr[results.productProperty]}`
                        }
                      ],
                      function (err, results) {
                        if (err) return reject(err);
                        productUpdate.body[columnToUpdate] = results.productPropertyValue;
                        // console.log(productUpdate);
                        dbPutProduct(productUpdate, productUpdate.product_id)
                          .then((updateMsg) => {
                            resolve(updateMsg);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    );
                  }
                );
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
