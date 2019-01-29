const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sgMail = require('@sendgrid/mail');
const sendVerificationMail = require('../../lib/utils/emailService/emailVerification');
const {
  SERVER_ERROR_CODE,
  VALID_TOKEN
} = require('../../constants');

chai.use(sinonChai);

describe('Send Verification Email', () => {
  afterEach(sinon.restore);
  const req = {
    jwtToken: VALID_TOKEN,
    email: 'michael.i.owolabi@gmail.com'
  };
  const reqs = {
    token: VALID_TOKEN
  };
  const res = {
    status() {},
    json() {}
  };
  it('Should send a notification mail to all followers of the author of a newly published article', async () => {
    sinon.stub(sgMail, 'send').returns(undefined);
    sinon.stub(res, 'status').returnsThis();
    await sendVerificationMail(req, res);
  });

  it('should not send a verification mail when email is not provided', async () => {
    sinon.stub(res, 'status').returnsThis();
    await sendVerificationMail(reqs, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
  });

  it('should throw a server error when sendgrid server is down', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(sgMail, 'send').throws();
    await sendVerificationMail(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
  });
});
