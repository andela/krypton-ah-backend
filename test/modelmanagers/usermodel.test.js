const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../lib/modelManagers/usermodel');
const user = require('../../database/models').User;
const { userprofile } = require('../../database/models');
const UserController = require('../../controllers/Users/userController');
const mockData = require('../mockData');
const { USER_EMAIL } = require('../../constants');

let id;
let res;
describe('Unit test usermodel allusers', () => {
  after('Delete User', async () => {
    user.destroy({
      where: {}
    });
  });
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
    expect(res.length).to.be.equals(1);
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
        'ttt@w.com',
        mockData.userdata.password,
        mockData.userdata.firstname,
        mockData.userdata.lastname
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

  describe('Get user details using parameters', () => {
    it('should return null if value in parameter does not exist in the databse column', async () => {
      const fakeEmail = mockData.fakeUserData.email;
      const userDetails = await User.getUserDetails(USER_EMAIL, fakeEmail);

      expect(userDetails).to.equal(null);
    });

    it('should return user details if value in parameter exist in the databse column', async () => {
      const userEmail = mockData.userdata.email;
      const userDetails = await User.getUserDetails(USER_EMAIL, userEmail);

      expect(userDetails).to.be.an('object');
      expect(userDetails).to.have.property('id');
      expect(userDetails).to.have.property('email').equal(mockData.userdata.email);
      expect(userDetails).to.have.property('firstname').equal(mockData.userdata.firstname);
      expect(userDetails).to.have.property('lastname').equal(mockData.userdata.lastname);
      expect(userDetails).to.have.property('password').equal(mockData.userdata.password);
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
      query: {}
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
const userModelManager = require('../../lib/modelManagers/usermodel');

const email = 'testmail@yahoo.com',
  password = '111111',
  firstname = 'testfirstname',
  lastname = 'testlastname';

let createdUser;

describe('Test for sending user info into database', () => {
  it('Should have method that sends user info to database', () => {
    expect(userModelManager.create).to.be.a('function');
  });

  it('should return a creted user object', async () => {
    expect(firstname).to.be.a('string');
    expect(lastname).to.be.a('string');
    expect(password).to.be.a('string');
    expect(email).to.be.a('string');

    createdUser = await userModelManager.create(email, password, firstname, lastname);
    const { dataValues } = createdUser;

    dataValues.lastname.should.equal('testlastname');
    dataValues.firstname.should.equal('testfirstname');
  });
});
