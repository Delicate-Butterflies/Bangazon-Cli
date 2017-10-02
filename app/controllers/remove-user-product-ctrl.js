'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');
const { red, magenta, blue } = require('chalk');
const colors = require('colors/safe');

let { dbCheckForProductSales, dbDeleteProduct, dbGetAllProductsByUser } = require('../models/Product.js');
let { dbDeleteOpenOrderByProduct } = require('../models/Order-Product.js');

module.exports.removeUserProduct = user_id => {
	return new Promise((resolve, reject) => {
		dbGetAllProductsByUser(user_id).then(data => {
			let productIdArr = [];
			console.log(data);
			console.log(`Customer ${user_id} - all Products:`);
			data.forEach(product => {
				productIdArr.push(product.id);
				console.log(`${product.id}: - ${product.title}`);
			});
			prompt.get(
				[
					{
						name: 'product_id',
						description: 'Please select Product ID:'
					}
				],
				function(err, choice) {
					if (err) {
						return reject(err);
					} else {
						console.log(choice.product_id);
						module.exports.displayWelcome();
					}
				}
			);

			// 		getActiveCustomer().then(seller_id => {
			// 			removeUserProduct(seller_id)
			// 				.then(message => {
			// 					console.log(message);
			// 					module.exports.displayWelcome();
			// 				})
			// 				.catch(err);
			// 		});
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 		module.exports.displayWelcome();
			// 	});
			// dbCheckForProductSales(product_id).then(data => {
			// 	// if product has sold - reject (change to adjust quantity at some point)
			// 	if (data.sold === 0) {
			// 		// TODO add sold < original quantity case
			// 		dbDeleteProduct(product_id)
			// 			.then(() => {
			// 				dbDeleteOpenOrderByProduct(product_id)
			// 					.then(data => {
			// 						resolve(`Product id ${product_id} removed`);
			// 					})
			// 					.catch(err => {
			// 						reject(err);
			// 					});
			// 			})
			// 			.catch(err => {
			// 				return reject(err);
			// 			});
			// 	} else if (data.sold > 0) {
			// 		// TODO - change original quantity to # sold? (available)
			// 		resolve('Cannot remove product, it is associated with orders');
			// 	} else {
			// 		// TODO - remove from all open orders
			// 		resolve('Removing product unsuccessfull');
			// 	}
		});
	});
};
