'use strict';

// TODO colorize output
// const { red, magenta, blue } = require('chalk');
// const colors = require('colors/safe');

let { dbSellerRevenue } = require('../models/Order.js');

module.exports.sellerRevenueReport = user_id => {
	return new Promise((resolve, reject) => {
		dbSellerRevenue(user_id)
			.then(soldProducts => {
				console.log(`Revenue Report for ${soldProducts[0].first_name} ${soldProducts[0].last_name}`);
				let printedOrderIds = [];
				soldProducts.forEach(closedOrder => {
					console.log(`Order #${closedOrder.id}`);
					// get product info from order
          dbGetOneOrder(order.id)
          .then((order) => {

          })
          .catch((err) => return reject err);
					//
				});
				resolve(revenueData);
			})
			.catch(err => reject(err));
	});
};
