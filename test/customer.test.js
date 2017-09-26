const { assert: { equal } } = require('chai');
const { createTables, insertRows } = require('../db/buildDB')

// Placed here to confirm test file runs properly
describe('just a test', () => {
  beforeEach((done) => {
    createTables()
      .then((msg) => {
        // console.log('Create Then', msg);
        return insertRows()
      })
      .then((idArr) => {
        // console.log('idArr', idArr);
        done();
      });
  });
  it('should be equal', () => {
<<<<<<< HEAD
    equal(3, 1 + 2);
=======
    equal(3, 1 + 2)
>>>>>>> master
  });
});

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
