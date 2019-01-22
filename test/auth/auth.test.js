const chai = require('chai'),
  { expect } = chai,
  chaiHttp = require('chai-http'),
  userModelManager = require('../../lib/modelManagers/usermodel'),
  authController = require('../../controllers/AuthController'),
  { User } = require('../../database/models'),
  server = require('../../index'),
  req = {
    body: {
      email: 'testmail@gmail.com',
      password: '111111',
      firstname: 'testfirstname',
      lastname: 'testlastname'
    }
  },
  correctDetails = {
    email: 'testmail@gmail.com',
    password: '111111'
  },
  incorrectDetails = {
    email: 'testmail@gmail.com',
    password: '11111'
  },
  incorrectMail = {
    email: 'tesmail@gmail.com',
    password: '11111'
  },
  next = () => {},
  res = () => {};

chai.use(chaiHttp);
chai.should();
/*
 Test to make sure User is created and token is generated
*/

describe('Test for adding a new user and generate token', () => {
  after(async () => {
    User.destroy({
      where: {}
    });
  });
  before(async () => {
    await authController.signUp(req, res, next);
  });
  it('should check if user has been successfully added', async () => {
    const newUser = await userModelManager.findUser('email', req.body.email);
    expect(newUser).to.be.an('object');
    expect(newUser).to.have.property('id');
    expect(newUser).to.have.property('isverified');
  });

  it('should check if a token has been generated', () => {
    expect(req.jwtToken).to.be.a('string');
  });
});

describe('Test for errors during the login process', () => {
  after(async () => {
    User.destroy({
      where: {}
    });
  });
  before(async () => {
    await authController.signUp(req, res, next);
  });

  it('Should tell a user to verify mail', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/users/signin/')
      .send(correctDetails);
    expect(res).to.have.status(400);
    res.body.success.should.equal(false);
    res.body.message.should.equal('Please verify account before login');
  });
  it('Should send incorrect cridentials message', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/users/signin/')
      .send(incorrectDetails);
    expect(res).to.have.status(400);
    res.body.success.should.equal(false);
    res.body.message.should.equal('Incorrect Credentials');
  });
  it('Should send user not found message', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/users/signin/')
      .send(incorrectMail);
    expect(res).to.have.status(404);
    res.body.success.should.equal(false);
    res.body.message.should.equal('Email does not match our record');
  });
});

describe('Test for a successful login and token generation', () => {
  const req = {
    body: {
      email: 'ver@gmail.com',
      password: '111111',
      firstname: 'verfirstname',
      lastname: 'verlastname'
    }
  };
  const verifiedUser = {
    email: 'ver@gmail.com',
    password: '111111'
  };
  before(async () => {
    await authController.signUp(req, res, next);
    const newUser = await userModelManager.findUser('email', req.body.email);
    const userId = newUser.dataValues.id;
    await userModelManager.update(userId, { isverified: true });
  });
  it('Should succesfully login the user and generate a token', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/users/signin/')
      .send(verifiedUser);
    expect(res).to.have.status(200);
    res.body.success.should.equal(true);
    res.body.message.should.equal('Login Successful');
    res.body.should.have.property('loginToken');
    res.body.loginToken.should.be.a('string');
    res.body.loginToken.should.not.equal('null');
  });
});
