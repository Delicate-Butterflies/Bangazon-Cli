'use strict';
/* eslint-disable no-console */

// TODO colorize output
// const { red, magenta, blue } = require('chalk');
// const colors = require('colors/safe');

let { dbSellerRevenue } = require('../models/User.js');

module.exports.sellerRevenueReport = user_id => {
	return new Promise((resolve, reject) => {
		console.log("Press ctrl+'c' to go back to main menu at any point");
		dbSellerRevenue(user_id)
			.then(soldProducts => {
				if (!soldProducts[0]) {
					return reject(`No Sales to Report for User ${user_id}`);
				} else {
					console.log(`Revenue Report for ${soldProducts[0].first_name} ${soldProducts[0].last_name}`);
					// store order #s that have been reported
					let printedOrderIds = [];
					let totalSales = 0;
					soldProducts.forEach(product => {
						// if the order # has not been printed, print line on report
						if (printedOrderIds.indexOf(product.order_id) === -1) {
							console.log(`Order #${product.order_id}-----------`);
							printedOrderIds.push(product.order_id);
						}
						// log info for each product on order
						console.log(
							`${product.title}, ${product.quantity}, ${product.price.toFixed(2)}, total ${(product.price *
								product.quantity).toFixed(2)}`
						);
						totalSales += product.price * product.quantity;
					});
					// fix rounding errors
					totalSales = totalSales.toFixed(2);
					console.log(`Total Sales (all Orders): ${totalSales}`);
					console.log('Press any key to continue.'); //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
					process.stdin.setRawMode(true);
					process.stdin.resume();
					process.stdin.on('data', () => {
						resolve(`Revenue Report completed`);
					});
				}
			})
			.catch(err => {
				return reject('\nBack to Main Menu', err);
			});
	});
};
