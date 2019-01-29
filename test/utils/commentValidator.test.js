/* eslint-disable no-unused-expressions */
const chai = require('chai'),
  sinon = require('sinon'),
  commentValidator = require('../../lib/utils/commentValidator');

const { expect, should } = chai;
should();

describe('comment validator', () => {
  it('it should validate comment', async () => {
    const req = {
      body: {
        mainCommentId: true,
        comment: 'comment'
      },
      check() {},
      trim() {},
      isUUID() {},
      notEmpty() {},
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
    sinon.stub(req, 'isUUID').returnsThis();
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'validationErrors').returns([{ msg: 'come' }]);
    sinon.stub(req, 'withMessage').returnsThis();
    await commentValidator(req, res, next);
    expect(res.status).to.have.been.calledOnce;
  });
  it('it should not validate empty comment fieid', async () => {
    const req = {
      body: {
        mainCommentId: true
      },
      check() {},
      trim() {},
      isUUID() {},
      notEmpty() {},
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
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'validationErrors').returns(false);
    sinon.stub(req, 'withMessage').returnsThis();
    await commentValidator(req, res, next);
    expect(next).to.have.been.calledOnce;
  });
  it('it should not validate empty comment fieid', async () => {
    const req = {
      body: {
        comment: 'comment'
      },
      check() {},
      trim() {},
      isUUID() {},
      notEmpty() {},
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
    sinon.stub(req, 'notEmpty').returnsThis();
    sinon.stub(req, 'validationErrors').returns(false);
    sinon.stub(req, 'withMessage').returnsThis();
    await commentValidator(req, res, next);
    expect(next).to.have.been.calledOnce;
  });
});
