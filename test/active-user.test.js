require('dotenv').config();
let TIMEOUT = process.env.TIMEOUT;

const { assert } = require('chai');

const { createTables, insertRows } = require('../db/buildDB');
const { dbGetAllUsers } = require('../app/models/User.js');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer.js');

describe('Get an active user', () => {
  before(function() {
    this.timeout(TIMEOUT);
    return createTables().then(() => {
      return insertRows();
    });
  });
  describe('dbGetAllUsers', () => {
    it('is a function', () => {
      assert.isFunction(dbGetAllUsers);
    });
    it('should return an array of objects', () => {
      return dbGetAllUsers().then(data => {
        assert.isArray(data);
      });
    });
  });
  describe('getActiveUser', () => {
    it('is a function', () => {
      assert.isFunction(getActiveCustomer);
    });
    it('should return null before settig an active user', () => {
      assert.isNull(getActiveCustomer());
    });
    it('should return active user id after setting active user', () => {
      setActiveCustomer('13');
      let expected = '13';
      assert.equal(getActiveCustomer(), expected);
    });
  });
});
