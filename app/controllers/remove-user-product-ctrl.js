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
			if (data.length == 0) {
				return reject(`${red('Customer has no products')}`);
			}
			let productArr = [];
			console.log(`Customer #${user_id} - all Products:`);
			data.forEach((product, index) => {
				productArr.push(product);
				console.log(`${index + 1}. ${product.title} (#${product.id})`);
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
					} else {
						let productId = productArr[choice.number - 1].id;
						dbCheckForProductSales(productId).then(data => {
							// if product has sold - reject (change to adjust quantity at some point)
							if (data.sold === 0) {
								// TODO add sold < original quantity case
								dbDeleteProduct(productId)
									.then(() => {
										dbDeleteOpenOrderByProduct(productId)
											.then(data => {
												resolve(`${blue(`Product id ${productId} removed`)}`);
											})
											.catch(err => {
												reject(err);
											});
									})
									.catch(err => {
										return reject(err);
									});
							} else if (data.sold > 0) {
								// TODO - change original quantity to # sold? (available)
								// TODO - OR remove from all open orders, but do not delete product or closed orderProduct
								resolve(`${red(`Cannot remove product id #${productId}, it is associated with orders`)}`);
							} else {
								resolve(`${red('Removing product unsuccessfull')}`);
							}
						});
					}
				}
			);
		});
	});
};
