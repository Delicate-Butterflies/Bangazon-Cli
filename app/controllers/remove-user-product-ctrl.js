'use strict';
/* eslint-disable no-console */

const prompt = require('prompt');

// TODO colorize output
// const { red, magenta, blue } = require('chalk');
// const colors = require('colors/safe');

let { dbCheckForProductSales, dbDeleteProduct, dbGetSingleProduct } = require('../models/Product.js');

module.exports.removeUserProduct = product_id => {
	// check for product on closed orders - remove 'extra'quantity
	// if none, remove from open orders (cascade?)
	// then remove from products
	// if product has sold, reject request (or change quantities somehow?)
};
