/* eslint-disable no-unused-expressions */
const chai = require('chai'),
  sinon = require('sinon'),
  paramsValidator = require('../../lib/utils/paramsValidator');

const { expect, should } = chai;
should();

describe('params validator', () => {
  it('it should validate params', async () => {
    const req = {
      check() {},
      isUUID() {},
      trim() {},
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
    sinon.stub(req, 'isUUID').returnsThis();
    sinon.stub(req, 'trim').returnsThis();
    sinon.stub(req, 'validationErrors').returns([{ msg: 'come' }]);
    sinon.stub(req, 'withMessage').returnsThis();
    await paramsValidator(req, res, next);
    expect(res.status).to.have.been.calledOnce;
  });
  it('it should not validate invalid params', async () => {
    const req = {
      body: {
        mainCommentId: true
      },
      check() {},
      trim() {},
      isUUID() {},
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
    sinon.stub(req, 'isUUID').returnsThis();
    sinon.stub(req, 'validationErrors').returns(false);
    sinon.stub(req, 'withMessage').returnsThis();
    await paramsValidator(req, res, next);
    expect(next).to.have.been.calledOnce;
  });
});
