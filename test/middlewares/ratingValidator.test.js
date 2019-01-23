const chai = require('chai'),
  sinon = require('sinon'),
  expressValidator = require('express-validator')(),
  validate = require('../../middlewares/ratingValidator'),
  mockData = require('../mockData'),
  { BAD_REQUEST_CODE } = require('../../constants/index'),
  { expect } = chai;

let req = {};
let req1 = {};
describe('Check function that validates Article Rating Model', () => {
  afterEach(() => sinon.restore());

  const userData = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  const mockReq = {
    body: {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    },
  };

  const mockReq2 = {
    body: {
      email: userData.email,
      password: userData.password,
      firstname: userData.firstname,
      lastname: userData.lastname
    },
  };

  beforeEach(async () => {
    await expressValidator(mockReq, {}, () => {
      req = mockReq;
    });

    await expressValidator(mockReq2, {}, () => {
      req1 = mockReq2;
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
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').be.an('array');
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
    sinon.stub(req1, 'validationErrors').returns(false);
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await validate(req1, res, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
});
