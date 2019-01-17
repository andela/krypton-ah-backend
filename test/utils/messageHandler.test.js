const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { successResponse, failureResponse } = require('../../lib/utils/messageHandler'),
  { OK_CODE, NOT_FOUND_CODE } = require('../../constants');

chai.use(sinonChai);
const { expect, should } = chai;
should();

describe('Response Message Handler Test', () => {
  it('should return success response when successResponse Message handler is called', async () => {
    const message = 'success message',
      data = {
        id: 1
      };

    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    await successResponse(res, message, OK_CODE, data);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });
  it('should return failure response when failureResponse Message handler is called', async () => {
    const message = 'failure message',
      data = {
        id: 1
      };

    const res = {
      status() {},
      json() {}
    };

    sinon.stub(res, 'status').returnsThis();
    await failureResponse(res, message, NOT_FOUND_CODE, data);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
  });
});
