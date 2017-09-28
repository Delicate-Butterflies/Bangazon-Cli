'use strict';

const prompt = require('prompt');

let { dbSellerRevenue } = require('../models/User.js');

module.exports.sellerRevenueReport = user_id => {
	return new Promise((resolve, reject) => {
		dbSellerRevenue(user_id)
			.then(revenueData => {
				console.log('ctrlr', revenueData);
				resolve(revenueData);
			})
			.catch(err => err);
	});
};
