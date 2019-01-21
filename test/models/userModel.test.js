const { expect } = require('chai');
const { getUser } = require('../../lib/modelManagers/usermodel');

const testUuid = '415e2efa-19e7-11e9-ab14-d663bd873d93';

describe('getUser model manager', () => {
  it('should respond with a user object when a valid user uuid is passed', async () => {
    expect(getUser(testUuid)).to.contain(Object);
  });
});
