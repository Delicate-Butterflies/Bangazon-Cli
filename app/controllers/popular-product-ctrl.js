'use strict';
/* eslint-disable no-console */
const prompt = require('prompt');
const { displayWelcome } = require('../ui');
module.exports.displayPopularProducts = () => {
  return new Promise((resolve, reject) => {
    prompt.get([
      {
        name: 'anyKey',
        description: 'press any key to return',
        pattern: '/^[a-zA-Z\x08?]$/'
      },
      function(err, results) {
        if (err) return reject(err);
        displayWelcome().then(() => {
          resolve(results);
        });
      }
    ]);
  });
};
