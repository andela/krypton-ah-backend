/* eslint-disable no-unused-expressions */
const chai = require('chai'),
  sinon = require('sinon'),
  roleValidator = require('../../lib/utils/roleValidator');

const { expect, should } = chai;
should();

describe('role validator', () => {
  it('it should validate role', async () => {
    const req = {
      body: {
        role: 'superadmin'
      },
      check() {},
      trim() {},
      notEmpty() {},
      matches() {},
      withMessage() {},
      validationErrors() {}
    };
    const res = {
      status() {},
      json() {}
    };
    const next = () => {};

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(req, 'check').returnsThis();
    sinon.stub(req, 'trim').returnsThis();
    sinon.stub(req, 'matches').returnsThis();
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'validationErrors').returns([{ msg: 'come' }]);
    sinon.stub(req, 'withMessage').returnsThis();
    await roleValidator(req, res, next);
    expect(res.status).to.have.been.calledOnce;
  });
  it('it should not validate empty role fieid', async () => {
    const req = {
      body: {
        role: ''
      },
      check() {},
      trim() {},
      notEmpty() {},
      matches() {},
      withMessage() {},
      validationErrors() {}
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(req, 'check').returnsThis();
    sinon.stub(req, 'trim').returnsThis();
    sinon.stub(req, 'matches').returnsThis();
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'validationErrors').returns(false);
    sinon.stub(req, 'withMessage').returnsThis();
    await roleValidator(req, res, next);
    expect(next).to.have.been.calledOnce;
  });
});
