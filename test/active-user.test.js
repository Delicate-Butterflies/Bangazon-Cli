const { assert } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');
const { getAllUsers } = require('../app/models/user.js');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer.js');

describe('Get an active user', () => {
  describe('getAllUsers', () => {
    it('is a function', () => {
      assert.isFunction(getAllUsers);
    });
    it('should return an array of objects', () => {
      return getAllUsers().then(data => {
        assert.isArray(data);
      });
    });
  });
  describe('getActiveUser', () => {
    it('is a function', () => {
      assert.isFunction(getActiveCustomer);
    });
    it('should return null before settig an active user', () => {
      assert.isNull(getActiveCustomer().id);
    });
    it('should return active user id after setting active user', () => {
      setActiveCustomer('13');
      let expected = '13';
      assert.equal(getActiveCustomer().id, expected);
    });
  });
});
