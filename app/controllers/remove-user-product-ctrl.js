'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');
const { red, blue } = require('chalk');

let { dbCheckForProductSales, dbDeleteProduct, dbGetAllProductsByUser } = require('../models/Product.js');
let { dbDeleteOpenOrderByProduct } = require('../models/Order-Product.js');

/**
 * Updates the current order with the user's selected payment type. This action completes the order.
 * @param {number} - order ID from order table representing current active user's open order
 * @param {object} - object containing key/value to be updated in the order object
 * @return {promise} - resolves with a message that the order has been successfully updated
 */
module.exports.removeUserProduct = user_id => {
	return new Promise((resolve, reject) => {
		dbGetAllProductsByUser(user_id).then(data => {
			if (data.length == 0) {
				return reject(`${red('Customer has no products')}`);
			}
			let productArr = [];
			console.log(`Customer #${user_id} - all Products:`);
			data.forEach((product, index) => {
				productArr.push(product);
				console.log(`${index + 1}. ${product.title} (product ID ${product.id})`);
			});
			prompt.get(
				[
					{
						name: 'number',
						description: 'Please select Product'
					}
				],
				function(err, choice) {
					if (err) {
						return reject(err);
					} else if (parseInt(choice.number) < 1 || choice.number > productArr.length) {
						return reject(`${red(`\n  >>No product #${choice.number} listed<<`)}`);
					} else {
						let productId = productArr[choice.number - 1].id;
						// this will change to dbGetSingleProduct
						dbCheckForProductSales(productId).then(data => {
							// let data.sold ==> data.original_q - data.sold_quantity
							if (data.sold === 0) {
								// TODO add sold < original quantity case
								dbDeleteProduct(productId)
									.then(() => {
										dbDeleteOpenOrderByProduct(productId)
											.then(() => {
												resolve(`${blue(`\n Product id ${productId} removed from database`)}`);
											})
											.catch(err => {
												return reject(err);
											});
									})
									.catch(err => {
										return reject(err);
									});
							} else if (data.sold > 0) {
								// TODO - change original quantity to # sold? (available)
								// change original_quantity to sold_quantity
								// remove from all open orders (remove open order ordersProducts rows)
								// resolve (`${blue(`\n Removed product ${} from open orders, available quantity to zero`)}`);
								resolve(`${red(`\n >>Cannot remove product id #${productId}, it is associated with orders<<`)}`);
							} else {
								return reject(`${red('\n >>Removing product unsuccessfull; database error, please contact admin<<')}`);
							}
						});
					}
				}
			);
		});
	});
};
