const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect } = chai,
  jwtValidator = require('../../middlewares/jwtValidator'),
  jwtUtil = require('../../lib/utils/jwtUtil'),
  expirationTime = '1h',
  payLoad = 'd4d6884c-ed49-4158-99cd-6305af05a4a6';

let token;

chai.use(sinonChai);
describe('Test make sure token validation middleware is working', () => {
  before(() => {
    token = jwtUtil.generateToken(expirationTime, payLoad);
  });
  it('Should return next function when token is valid', () => {
    const req = {
      body: {
        token
      }
    };

    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    jwtValidator(req, res, next);
    expect(next.calledOnce).to.be.eq(true);
  });
  it('Should return error when token is invalid', () => {
    const req = {
      body: {
        token:
          'ehbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlMb2FkIjoiZDRkNjg4NGMtZWQ0OS00MTU4LTk5Y2QtNjMwNWFmMDVhNGE2IiwiaWF0IjoxNTQ3ODQ4OTEwLCJleHAiOjE1NDc4NTI1MTB9.iqb-039L5_kzl1r4EVA0JMmQeEDMwkaiZDpaYj7CvDc'
      }
    };

    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    jwtValidator(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.an('object');
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should return error when token is expired', () => {
    const req = {
      body: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlMb2FkIjoiZDRkNjg4NGMtZWQ0OS00MTU4LTk5Y2QtNjMwNWFmMDVhNGE2IiwiaWF0IjoxNTQ3OTE3MjM2LCJleHAiOjE1NDc5MTcyOTZ9.qiwecbhIZaMNVl19v21PvPHPLKoeM2GAxWr7ws9srEk'
      }
    };

    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    jwtValidator(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.an('object');
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
});

describe('Test make sure token fails when nothing is provided', () => {
  it('Should return error when no token is sent', () => {
    const req = {
      body: {
        token: undefined
      },
      query: {
        token: undefined
      },
      headers: {
        token: undefined
      },
      params: { token: undefined }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();

    sinon.stub(res, 'status').returnsThis();
    jwtValidator(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.an('object');
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
});
