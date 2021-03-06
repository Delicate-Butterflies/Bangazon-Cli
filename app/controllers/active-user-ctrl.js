'use strict';

const prompt = require('prompt');
const { dbGetAllUsers } = require('../models/User');

module.exports.promptPrintUsers = () => {
  let activeUserIDs = [];
  return new Promise((resolve, reject) => {
    dbGetAllUsers().then(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id}: ${data[i].first_name} ${data[i].last_name}`);
        activeUserIDs.push(data[i].id);
      }
      prompt.get(
        [
          {
            name: 'activeUser',
            description: 'Which customer will be active?'
          }
        ],
        function(err, results) {
          if (err) return reject('\nBack to main Menu', err);
          results.activeUser = parseInt(results.activeUser);
          if (activeUserIDs.indexOf(results.activeUser) > -1) {
            results.exists = true;
            for (let i = 0; i < data.length; i++) {
              if (data[i].id == results.activeUser) results.userName = `${data[i].first_name} ${data[i].last_name}`;
            }
          } else results.exists = false;
          resolve(results);
        }
      );
    });
  });
};
