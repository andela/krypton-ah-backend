const { expect } = require('chai'),
  { User } = require('../../database/models'),
  { getUser } = require('../../lib/modelManagers/usermodel');

let res;
const dummyUser = {
  id: 'ed698f63-ae46-436d-a627-d325364a7ab2',
  email: 'isaiah.afolayan@gmail.com',
  password: 'qwerty3456etfg',
  firstname: 'Afolayan',
  lastname: 'Isaiah',
  isverified: true
};
describe('Follow model manager unit test', () => {
  let userId;
  before(async () => {
    res = await User.create(dummyUser);
    userId = res.dataValues.id;
  });
  it('should return an object of a user', async () => {
    res = await getUser(userId);
    expect(res).to.be.an('object');
    expect(res.dataValues).to.have.property('id');
    expect(res.dataValues).to.have.property('email');
    expect(res.dataValues).to.have.property('password');
    expect(res.dataValues).to.have.property('firstname');
    expect(res.dataValues).to.have.property('lastname');
    expect(res.dataValues.isverified).to.deep.equal(true);
  });

  it('should have property of id', async () => {
    res = await getUser(userId);
    expect(res.dataValues).to.have.property('id');
  });
  it('should have property of email', async () => {
    res = await getUser(userId);
    expect(res.dataValues).to.have.property('email');
  });
  it('should have property of firstname', async () => {
    res = await getUser(userId);
    expect(res.dataValues).to.have.property('firstname');
  });
  it('should have property of lastname', async () => {
    res = await getUser(userId);
    expect(res.dataValues).to.have.property('lastname');
  });
  it('should have property isverified and must be true', async () => {
    res = await getUser(userId);
    expect(res.dataValues.isverified).to.deep.equal(true);
  });
});
