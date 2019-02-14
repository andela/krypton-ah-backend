const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const verifyNewUser = require('../../controllers/verificationEmailController');
const User = require('../../lib/modelManagers/usermodel');
const {
  REDIRECT_CODE,
  OK_CODE,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  UUID,
  CALLBACK_URL
} = require('../../constants');
const {
  userdata3,
  fakeUser2
} = require('../mockData');

chai.use(sinonChai);

describe('New user account verification', () => {
  afterEach(sinon.restore);
  it('should get the users uuid and redirect using the callback URL whenever the user tries to re-verify their account', async () => {
    const req = {
      decodedToken: UUID,
      query: {
        callbackUrl: CALLBACK_URL
      }
    };
    const res = {
      status() {},
      redirect() {},
      json() {}
    };
    sinon.stub(res, 'redirect').returnsThis();
    sinon.stub(User, 'getUser').returns(userdata3);
    await verifyNewUser(req, res);
    expect(res.redirect).to.have.been.calledWith(REDIRECT_CODE);
  });

  it('should get the users uuid and verify their account if their account is not already verified then redirect using the callback URL', async () => {
    const req = {
      decodedToken: UUID,
      query: {
        callbackUrl: CALLBACK_URL
      }
    };
    const res = {
      status() {},
      redirect() {},
      json() {}
    };
    sinon.stub(res, 'redirect').returnsThis();
    sinon.stub(User, 'getUser').returns(true);
    sinon.stub(User, 'update').returns(true);
    await verifyNewUser(req, res);
    expect(res.redirect).to.have.been.calledWith(REDIRECT_CODE);
  });

  it('should return a server error when there is one', async () => {
    const req = {
      decodedToken: UUID,
      query: {
        callbackUrl: CALLBACK_URL
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const field = { isVerified: false };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'getUser').returns(true);
    sinon.stub(field, 'isVerified').returns(true);
    sinon.stub(User, 'update').throws();
    await verifyNewUser(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
  });

  it('should get the users uuid and verify their account if their account is not already verified even without a callback URL', async () => {
    const req = {
      decodedToken: UUID,
      query: {}
    };
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'getUser').returns(fakeUser2);
    sinon.stub(User, 'update').returns(true);
    await verifyNewUser(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });

  it('should get the users uuid but returns a bad request error if the user is already verified', async () => {
    const req = {
      decodedToken: {
        payLoad: UUID
      },
      query: {}
    };
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'getUser').returns(userdata3);
    await verifyNewUser(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
  });

  it('should return a server error when there is one', async () => {
    const reqs = {
      decodedToken: UUID,
      query: {}
    };
    const res = {
      status() {},
      json() {}
    };
    const field = { isVerified: false };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'getUser').returns(true);
    sinon.stub(field, 'isVerified').returns(true);
    sinon.stub(User, 'update').throws();
    await verifyNewUser(reqs, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
  });
});
