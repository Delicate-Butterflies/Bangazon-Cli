'use strict';

const prompt = require('prompt');
const { getAllUsers } = require('../models/user');

module.exports.promptPrintUsers = () => {
  return new Promise((resolve, reject) => {
    getAllUsers().then(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id}: ${data[i].first_name} ${data[i].last_name}`);
      }
      prompt.get(
        [
          {
            name: 'activeUser',
            description: 'Which customer will be active?'
          }
        ],
        function(err, results) {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  });
};
