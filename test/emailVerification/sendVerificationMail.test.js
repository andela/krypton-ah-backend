const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('../../lib/utils/emailService/emailTemplate');
const sendVerificationMail = require('../../lib/utils/emailService/emailVerification');
const { FROM, SUBJECT, SERVER_ERROR_CODE } = require('../../constants');

chai.use(sinonChai);
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDE1ZTJlZmEtMTllNy0xMWU5LWFiMTQtZDY2M2JkODczZDkzIiwiaWF0IjoxNTQ3ODIxMjk2LCJleHAiOjE1NDc5MDc2OTZ9.DVwT7E9aU92ByHEw7GNn8URI-iZAR2VCLIY47dilOec';

describe('Send Verification Email', () => {
  afterEach(sinon.restore);
  const req = {
    jwtToken: validToken,
    email: 'michael.i.owolabi@gmail.com'
  };
  const reqs = {
    token: validToken
  };
  const res = {
    status() {},
    json() {}
  };
  it('Should send verification mail to newly registered user', async () => {
    const baseUrl = process.env.APP_BASE_URL;
    const hostUrl = `${baseUrl}/verifyemail/${validToken}`;

    const msg = {
      to: 'michael.i.owolabi@gmail.com',
      from: FROM,
      subject: SUBJECT,
      html: emailTemplate(hostUrl)
    };
    sinon.stub(sgMail, 'send').returns(undefined);
    sinon.stub(res, 'status').returnsThis();
    await sendVerificationMail(req, res);
    expect(sgMail.send).to.have.been.calledWith(msg);
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
