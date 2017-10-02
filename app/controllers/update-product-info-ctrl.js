'use strict';

const prompt = require('prompt');
const { dbGetAllProductsBySellerID, dbGetSingleProduct, dbPutProduct, dbCheckForProductSales } = require('../models/Product');


/**
 * Prompts the user to select one of their products to update
 * @param {number} seller_ID - userId from users table representing current active user
 */
module.exports.promptUpdateProdInfo = seller_ID => {
  let productUpdate = {};
  let productID = null;
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
            productID = results.productId;
            let soldQty = null;
            dbCheckForProductSales(results.productId).then((productQty) => {
              soldQty = productQty.sold;
              return dbGetSingleProduct(results.productId);
            })
              .then((productData) => {
                console.log(`
1. Change Title "${productData.title}"
2. Change Description "${productData.description}"
3. Change Price "${productData.price}"
4. Change Available Quantity "${productData.original_quantity - soldQty}" (${productData.original_quantity} original qty)
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
                    productUpdate[columnNameArr[results.productProperty]] = null;
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
                        console.log('results', results);
                        if (productUpdate.hasOwnProperty('original_quantity')) {
                          productUpdate.original_quantity = parseInt(results.productPropertyValue) + parseInt(soldQty);
                        } else {
                          productUpdate[columnToUpdate] = results.productPropertyValue;
                        }
                        // console.log(productUpdate);
                        dbPutProduct(productUpdate, productID)
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
