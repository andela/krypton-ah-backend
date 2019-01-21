const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../lib/modelManagers/usermodel');
const user = require('../../database/models').User;
const { userprofile } = require('../../database/models');
const UserController = require('../../controllers/Users/userController');
const mockData = require('../mockData');

let id;
let res;
describe('Unit test usermodel allusers', () => {
  before(async () => {
    res = await user.create(mockData.userdata).then(async (newUser) => {
      await userprofile.create(mockData.userprofile);
      return newUser;
    });
    ({ id } = res.dataValues);
  });

  it('should list all users in the database', async () => {
    const res = await User.listAllUsers();
    expect(res).to.be.a('array');
    expect(res[0]).to.be.a('object');
    expect(res.length).to.be.equals(7);
    expect(res[0].dataValues).contains.a.property('userprofile');
    expect(res[0].dataValues.userprofile.length).is.not.equals('0');
    expect(res[0].dataValues.userprofile).contains.a.property('UserId');
    expect(res[0].dataValues.userprofile).contains.a.property('avatar');
    expect(res[0].dataValues.userprofile).contains.a.property('username');
    expect(res[0].dataValues.userprofile).contains.a.property('country');
    expect(res[0].dataValues.userprofile).contains.a.property('bio');
    expect(res[0].dataValues.userprofile).contains.a.property('phonenumber');
  });

  describe('Unit test usermodel create function', () => {
    it('should create a new user', async () => {
      res = await User.create(
        mockData.userdata.email,
        mockData.userdata.password, mockData.userdata.firstname, mockData.userdata.lastname
      );
      expect(res).to.be.an('object');
      expect(res.dataValues).to.have.property('id');
      expect(res.dataValues).to.have.property('email');
      expect(res.dataValues).to.have.property('firstname');
      expect(res.dataValues).to.have.property('lastname');
      expect(res.dataValues).to.have.property('email');
      expect(res.dataValues.isverified).to.equal(false);
    });
  });
  describe('Unit test usermodel update', () => {
    it('should update a specific users information', async () => {
      const res = await User.update(id, mockData.userdata);
      expect(res).to.be.an('array');
      expect(res).to.contain(1);
    });

    it('should return false for trying to update details of an invalid user', async () => {
      const res = await User.update(mockData.token.id, mockData.userdata2);
      expect(res).to.be.a('array');
      expect(res[0]).to.equal(0);
    });
  });

  describe('Unit test usermodel delete function', () => {
    it('should return true for deleting a specific user sucessfully', async () => {
      const res = await User.delete(id);
      expect(res).to.be.a('number');
      expect(res).to.equal(1);
    });

    it('should return false for trying deleting an invalid user', async () => {
      const res = await User.delete(mockData.token.id);
      expect(res).to.be.a('number');
      expect(res).to.equal(0);
    });
  });

  it('should display a custom error message incase of server error', async () => {
    const req = {
      query: { }
    };
    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'listAllUsers').throws();
    await UserController.listUsers(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});
