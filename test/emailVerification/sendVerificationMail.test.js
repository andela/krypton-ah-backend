const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('../../lib/utils/emailService/emailTemplate');
const sendVerificationMail = require('../../lib/utils/emailService/emailVerification');
const { fakeEmail } = require('../mockData');
const {
  FROM,
  SUBJECT,
  SERVER_ERROR_CODE,
  RESOURCE_CREATED_CODE,
  VALID_TOKEN,
  OK_CODE,
} = require('../../constants');

chai.use(sinonChai);

describe('Send Verification Email', () => {
  afterEach(sinon.restore);
  const req = {
    jwtToken: VALID_TOKEN,
    email: fakeEmail.email2
  };
  const reqs = {
    token: VALID_TOKEN
  };
  const res = {
    status() {},
    json() {}
  };
  it('Should send verification mail to newly registered user', async () => {
    const baseUrl = process.env.APP_BASE_URL;
    const hostUrl = `${baseUrl}/api/v1/users/verifyemail/${VALID_TOKEN}`;

    const msg = {
      to: fakeEmail.email2,
      from: FROM,
      subject: SUBJECT,
      html: emailTemplate(hostUrl)
    };
    sinon.stub(sgMail, 'send').returns(undefined);
    sinon.stub(res, 'status').returnsThis();
    await sendVerificationMail(req, res);
    expect(sgMail.send).to.have.been.calledWith(msg);
  });

  it('Should send verification mail to newly registered user', async () => {
    sinon.stub(sgMail, 'send').returns(true);
    sinon.stub(res, 'status').returnsThis();
    await sendVerificationMail(req, res);
    expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
  });

  it('Should resend verification mail to newly registered user if they request one', async () => {
    const req = {
      resend: true
    };
    sinon.stub(sgMail, 'send').returns(true);
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(req, 'resend').returns(true);
    await sendVerificationMail(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
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
