'use strict';

const prompt = require('prompt');
const keypress = require('keypress');

/* prompt info:
  description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used.
  type: 'string',                 // Specify the type of input to expect.
  pattern: /^\w+$/,                  // Regular expression that input must be valid against.
  message: 'Password must be letters', // Warning message to display if validation fails.
  hidden: true,                        // If true, characters entered will either not be output to console or will be outputed using the `replace` string.
  replace: '*',                        // If `hidden` is set it will replace each hidden character with the specified string.
  default: 'lamepassword',             // Default value to use if no value is entered.
  required: true                        // If true, value entered must be non-empty.
  before: function(value) { return 'v' + value; } // Runs before node-prompt callbacks. It modifies user's input
*/

let { dbPostUser } = require('../models/User.js');

module.exports.promptNewUser = () => {
  return new Promise((resolve, reject) => {
    console.log('Press esc to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume(); //https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
    process.stdin.on('data', key => {
      let newKey = process.stdin.read(key);
      console.log(newKey);
      if (key.toString('utf-8') == null) {
        prompt.stop();
        resolve('You have returned to the main menu!');
        // process.stdin.setRawMode(true);
      }
    });
    prompt.get(
      [
        {
          name: 'first_name',
          description: "Enter customer's first name",
          type: 'string',
          pattern: /^[a-zA-Z.]+$/, //takes only letters
          message: 'No special characters or numbers allowed except .',
          required: true
        },
        {
          name: 'last_name',
          description: "Enter customer's last Name",
          type: 'string',
          pattern: /^[a-zA-Z.]+$/, //takes only letters
          message: 'No special characters or numbers allowed except .',
          required: true
        },
        {
          name: 'street_address',
          description: 'Enter street address',
          type: 'string',
          required: true
        },
        {
          name: 'city_address',
          description: 'Enter city',
          type: 'string',
          pattern: /^[a-zA-Z]+$/,
          messgae: 'No special characters allowed',
          required: true
        },
        {
          name: 'state_code',
          description: 'Enter state (KY)',
          type: 'string',
          pattern: /^(\w{2})$/,
          message: 'Enter the 2 letter state code',
          required: true
        },
        {
          name: 'zip_code',
          description: 'Enter postal code',
          type: 'string',
          pattern: /^(\d{5})$/,
          message: 'Invalid postal code! Should be 5 digits long only',
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        dbPostUser(results)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            return reject(err);
          });
      }
    );
  });
};
