require('dotenv').config();
let { readFileSync } = require('fs');

const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { dbGetOneUser, dbPostUser, getUser } = require('../app/models/User.js');

let TIMEOUT = process.env.TIMEOUT;

let dbUsers = JSON.parse(readFileSync('db/json/users.json'));

let newUserObj = {
  city_address: 'Nashville',
  first_name: 'Jon',
  last_name: 'Roberts',
  state_code: 'TN',
  street_address: '555 Shady Ln',
  zip_code: '37216'
};

// Placed here to confirm test file runs properly
describe('create a user', () => {
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      // console.log('Create Then', msg);
      return insertRows();
    });
  });
  describe('get a user', () => {
    describe('dbGetUser()', () => {
      it('is a function', () => {
        assert.isFunction(dbGetOneUser);
      });
      it('should return an object', () => {
        return dbGetOneUser(1).then(data => {
          assert.isObject(data);
        });
      });
      it('should get correct user info', () => {
        return dbGetOneUser(1).then(data => {
          dbUsers[0].id = parseInt(dbUsers[0].id);
          assert.deepEqual(data, dbUsers[0]);
        });
      });
    });
    describe('promptNewUser', () => {
      it('should add correct data to db', () => {
        // prompt info is input to dbPostUser, test info from dbGetUser is the same
        return dbPostUser(newUserObj).then(postData => {
          return dbGetOneUser(postData.id).then(data => {
            // can't use deepEqual due to account_creation_date, last_login_date added by dbPostUser
            // check for input properties
            assert.equal(data.first_name, newUserObj.first_name);
            assert.equal(data.last_name, newUserObj.last_name);
            assert.equal(data.street_address, newUserObj.street_address);
            assert.equal(data.city_address, newUserObj.city_address);
            assert.equal(data.state_code, newUserObj.state_code);
            assert.equal(data.zip_code, newUserObj.zip_code);
          });
        });
      });
      it('should pass error', () => {
        // TODO - how to test?
      });
    });
  });
});
