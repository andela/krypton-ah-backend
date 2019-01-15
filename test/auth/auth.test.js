const chai = require('chai'),
  { expect } = chai;
const chaiHttp = require('chai-http');
const userModelManager = require('../../lib/modelManagers/usermodel');
const authController = require('../../controllers/AuthController');
const server = require('../../index');

chai.use(chaiHttp);
chai.should();

const req = {
  body: {
    email: 'testmail@gmail.com',
    password: '111111',
    firstname: 'testfirstname',
    lastname: 'testlastname'
  }
};
const correctDetails = {
  email: 'testmail@gmail.com',
  password: '111111'
};
const incorrectDetails = {
  email: 'testmail@gmail.com',
  password: '11111'
};
const incorrectMail = {
  email: 'tesmail@gmail.com',
  password: '11111'
};

const next = () => {};
const res = () => {};

/*
 Test to make sure User is created and token is generated
*/

describe('Test for adding a new user and generate token', () => {
  describe('Test with correct information', () => {
    before('Should add a new user to the database', async () => {
      await authController.signUp(req, res, next);
    });
    it('Should check if added user exist', async () => {
      const newUser = await userModelManager.findUser(req.body.email);
      expect(newUser).to.be.an('object');
      expect(newUser).to.have.property('id');
      expect(newUser).to.have.property('isverified');
    });

    it('Should check if a token has been generated', () => {
      expect(req.jwtToken).to.be.a('string');
    });
  });

  describe('Granting access and token generation', () => {
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
    // it('Should login a verified user', async () => {
    //   const res = await chai
    //     .request(server)
    //     .post('/api/v1/auth/signin/')
    //     .send(verifiedUser);
    //   expect(res).to.have.status(404);
    //   res.body.success.should.equal(false);
    //   res.body.message.should.equal('User not found');
    // });
  });
});
