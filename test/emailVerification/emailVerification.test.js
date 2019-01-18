const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const verifyNewUser = require('../../controllers/verificationEmailController');
const User = require('../../lib/modelManagers/usermodel');
const {
  OK_CODE,
  SERVER_ERROR_CODE,
} = require('../../constants');

chai.use(sinonChai);

describe('New user account verification', () => {
  afterEach(sinon.restore);

  it('should get the users uuid and verify their account if their account is not already verified', async () => {
    const req = {
      decodedToken: '415e2efa-19e7-11e9-ab14-d663bd873d93'
    };
    const res = {
      status() {},
      json() {}
    };
    const field = { isVerified: false };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(User, 'getUser').returns(true);
    sinon.stub(field, 'isVerified').returns(false);
    sinon.stub(User, 'update').returns(true);
    await verifyNewUser(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });

  it('should return a server error when there is one', async () => {
    const reqs = {
      decodedToken: 'uuid'
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
