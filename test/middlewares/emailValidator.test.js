/* eslint-disable no-unused-expressions */
const chai = require('chai'),
  sinon = require('sinon'),
  emailValidator = require('../../middlewares/emailValidator'),
  { expect, should } = chai;

should();

describe('email validator', () => {
  it('it should not validate invalid email', async () => {
    const req = {
      check() {},
      notEmpty() {},
      isEmail() {},
      trim() {},
      withMessage() {},
      validationErrors() {},
      body: {
        email: 'Lumpseygmail.com'
      }
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };
    const next = sinon.stub();

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(req, 'check').returnsThis();
    sinon.stub(req, 'isEmail').returnsThis();
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'trim').returnsThis();
    sinon.stub(req, 'validationErrors').returns([{ msg: 'come' }]);
    sinon.stub(req, 'withMessage').returnsThis();
    await emailValidator(req, res, next);
    expect(res.status).to.have.been.calledOnce;
  });
  it('it should not validate empty email field', async () => {
    const req = {
      check() {},
      notEmpty() {},
      isEmail() {},
      trim() {},
      withMessage() {},
      validationErrors() {},
      body: {}
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };
    const next = sinon.stub();

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(req, 'check').returnsThis();
    sinon.stub(req, 'isEmail').returnsThis();
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'trim').returnsThis();
    sinon.stub(req, 'validationErrors').returns([{ msg: 'come' }]);
    sinon.stub(req, 'withMessage').returnsThis();
    await emailValidator(req, res, next);
    expect(res.status).to.have.been.calledOnce;
  });
});
