'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');

// TODO colorize output
// const { red, magenta, blue } = require('chalk');
// const colors = require('colors/safe');

let { dbCheckForProductSales, dbDeleteProduct, dbGetSingleProduct } = require('../models/Product.js');

// list all sellers products?

module.exports.removeUserProduct = product_id => {
	return new Promise((resolve, reject) => {
		dbCheckForProductSales(product_id).then(data => {
			// if product has sold - reject (change to adjust quantity at some point)
			if (data.sold === 0) {
				// TODO add sold < original quantity case
				dbDeleteProduct(product_id)
					.then(() => {
						resolve(`Product id ${product_id} removed`);
						// TODO if none, remove from open orders (cascade?)
					})
					.catch(err => {
						return reject(err);
					});
			} else if (data.sold > 0) {
				// TODO - change original quantity to # sold? (available)
				resolve('Cannot remove product, it is associated with orders');
			} else {
				// TODO - remove from all open orders
				resolve('Removing product unsuccessfull');
			}
		});
	});
};
