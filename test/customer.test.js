const { assert: { equal } } = require('chai');
const { createTables, insertRows } = require('../db/buildDB');

// Placed here to confirm test file runs properly
describe('just a test', () => {
	beforeEach(() => {
		return createTables().then(() => {
			// console.log('Create Then', msg);
			return insertRows();
		});
	});
	it('should be equal', () => {
		equal(3, 1 + 2);
	});
});

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
