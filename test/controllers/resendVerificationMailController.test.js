const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const resendMail = require('../../controllers/resendVerificationMailController');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const { User } = require('../../database/models');
const jwtUtil = require('../../lib/utils/jwtUtil');
const { VALID_TOKEN } = require('../../constants');
const {
  fakeUser,
  fakeUser2,
  fakeEmail
} = require('../mockData');
const {
  res,
  options
} = require('../testHelper');
const {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE
} = require('../../constants');

chai.use(sinonChai);

describe('Resend activation mail to new users', () => {
  beforeEach(async () => {
    await UserModelManager.create(fakeUser.email, fakeUser.pass, fakeUser.fname, fakeUser.lname);
  });
  afterEach(async () => {
    sinon.restore();
    User.destroy(options);
  });

  it('should not resend an activation mail to unregistered users', async () => {
    const req = {
      body: {
        email: fakeEmail.email1,
      }
    };
    sinon.stub(res, 'status').returnsThis();
    await resendMail(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
  });

  it('should not resend an activation link to already activated user account', async () => {
    const req = {
      body: {
        email: fakeUser.email,
      }
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(UserModelManager, 'findUser').returns(fakeUser);
    sinon.stub(fakeUser, 'isverified').returns(true);
    await resendMail(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
  });

  it('should call the genrateToken function to generate a token when all checks have been done', async () => {
    const req = {
      body: {
        email: fakeUser.email,
      }
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(UserModelManager, 'findUser').returns(fakeUser2);
    sinon.stub(fakeUser, 'isverified').returns(false);
    sinon.stub(jwtUtil, 'generateToken').returns(VALID_TOKEN);
    await resendMail(req, res);
    expect(jwtUtil.generateToken).to.have.been.calledBefore(next);
    expect(jwtUtil.generateToken).to.returned(VALID_TOKEN);
  });

  it('should throw an error when ther is a server error', async () => {
    const req = {
      body: {
        email: fakeUser.email,
      }
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(UserModelManager, 'findUser').throws();
    sinon.stub(fakeUser, 'isverified').returns(false);
    await resendMail(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
  });
});
