/* eslint-disable no-unused-expressions */
const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  jwt = require('jsonwebtoken'),
  User = require('../../lib/modelManagers/usermodel'),
  PasswordReset = require('../../controllers/forgetPasswordController'),
  { UUID, BAD_TOKEN } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);

describe('Check function that sends resets mail', () => {
  afterEach(() => sinon.restore());
  it('should return Email does not exist and not send email if email does not exist', async () => {
    const stub = sinon.stub(User, 'getUserDetails').resolves(false);
    const req = {
      body: {
        email: '',
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await PasswordReset.sendResetLink(req, res);
    expect(stub).to.have.been.called;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal('Email does not exist');
  });

  it('should return Reset Link Valid if reset link is valid', async () => {
    const uuid = UUID;
    const token = jwt.sign({ uuid }, process.env.SECRET_KEY, {
      expiresIn: '10min',
    });

    const req = {
      params: {
        token,
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await PasswordReset.checkResetLink(req, res);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal('Reset Link Valid');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('userId').equal(UUID);
  });

  it('should return Reset Link Expired if reset link is expired', async () => {
    const token = jwt.sign({ UUID }, process.env.SECRET_KEY, {
      expiresIn: '0.001s',
    });
    const req = {
      params: {
        token,
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await PasswordReset.checkResetLink(req, res);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal('Reset Link Expired');
  });

  it('should return Reset Link Invalid if reset link is invalid', async () => {
    const token = BAD_TOKEN;
    const req = {
      params: {
        token,
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await PasswordReset.checkResetLink(req, res);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal('Reset Link Invalid');
  });
});
