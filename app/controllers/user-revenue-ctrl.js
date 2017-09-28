'use strict';

// TODO colorize output
// const { red, magenta, blue } = require('chalk');
// const colors = require('colors/safe');

let { dbGetSellerOrders } = require('../models/Order.js');

module.exports.sellerRevenueReport = user_id => {
	return new Promise((resolve, reject) => {
		dbGetSellerOrders(user_id)
			.then(closedOrders => {
				console.log(`Revenue Report for ${closedOrders[0].first_name} ${closedOrders[0].last_name}`);
				closedOrders.forEach(closedOrder => {
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
