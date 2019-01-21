const { expect } = require('chai');
const User = require('../../lib/modelManagers/usermodel');

const emails = [{ value: 'isaiah@gmail.com' }];
const name = ['Isaiah', 'Afolayan'];
describe('Find or Create a user', () => {
  it('should find or create a user', async () => {
    const res = await User.findOrCreateUser(emails, name);
    expect(res).to.be.an('array');
    expect(res[0].dataValues).to.include.all.property('email');
    expect(res[0].dataValues).to.include.all.property('firstname');
    expect(res[0].dataValues).to.include.all.property('firstname');
    expect(res[0].dataValues).to.include.all.property('id');
    expect(res[0].dataValues).to.include.all.property('lastname');
    expect(res[0].dataValues.isverified).to.be.eql(true);
  });
});
