'use strict';

const prompt = require('prompt');

let { dbSellerRevenue } = require('../models/User.js');

module.exports.sellerRevenueReport = user_id => {
	dbSellerRevenue(user_id)
		.then(revenueData => {
			console.log(revenueData);
		})
		.catch(err => err);
};
