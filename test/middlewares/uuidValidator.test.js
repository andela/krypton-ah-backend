const chai = require('chai'),
  sinon = require('sinon'),
  expressValidator = require('express-validator')(),
  validate = require('../../middlewares/uuidValidator'),
  { BAD_REQUEST_CODE } = require('../../constants/index'),
  { expect } = chai;

let req = {},
  request = {};

const wrongUUID = '96124dea-260f-4b97-9e7d-99ff';

describe('Check report tag validation', () => {
  afterEach(() => sinon.restore());
  const invalidUUID = {
    params: {
      id: wrongUUID
    }
  };

  const validUUID = {
    params: {
      id: '96124dea-260f-4b97-9e7d-99ff49fc94e9'
    }
  };

  beforeEach(async () => {
    await expressValidator(invalidUUID, {}, () => {
      req = invalidUUID;
    });
    await expressValidator(validUUID, {}, () => {
      request = validUUID;
    });
  });

  it('should send error message for request body parameter violation', async () => {
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await validate(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
  });

  it('should call next middleware function if no request body paramater is violated', async () => {
    const res = {
      status() { return this; },
      json() { }
    };

    const nextMock = {
      next: () => {}
    };

    const nextStub = sinon.stub(nextMock, 'next');
    sinon.stub(request, 'validationErrors').returns(false);
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await validate(request, res, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
});
