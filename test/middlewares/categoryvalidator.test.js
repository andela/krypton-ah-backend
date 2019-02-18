const chai = require('chai'),
  sinon = require('sinon'),
  expressValidator = require('express-validator')(),
  category = require('../../middlewares/categoriesValidator'),
  reportTagName = require('../mockData'),
  { BAD_REQUEST_CODE } = require('../../constants/index'),
  { expect } = chai;

let req = {},
  request = {},
  emptyName;

describe('Check report tag validation', () => {
  afterEach(() => sinon.restore());
  const invalidName = {
    body: {
      name: emptyName
    }
  };

  const validName = {
    body: {
      name: reportTagName
    }
  };

  beforeEach(async () => {
    await expressValidator(invalidName, {}, () => {
      req = invalidName;
    });

    await expressValidator(validName, {}, () => {
      request = validName;
    });
  });

  it('should send error message for request body parameter violation', async () => {
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await category(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
  });

  it('should call next middleware function if no request body paramater is violated', async () => {
    const res = {
      status() { return this; },
      json() { }
    };

    const nextMock = {
      next: () => { }
    };

    const nextStub = sinon.stub(nextMock, 'next');
    sinon.stub(request, 'validationErrors').returns(false);
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await category(request, res, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
});
