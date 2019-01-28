const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  jwtValidator = require('../../middlewares/jwtValidator'),
  jwtUtil = require('../../lib/utils/jwtUtil'),
  expirationTime = '1h',
  payLoad = '1576a842-7ceb-4848-9a9c-2c925ba959d1',
  { socailLoginsCallback, getUserToken } = require('../../controllers/socialLoginControllers'),
  User = require('../../lib/modelManagers/usermodel');

chai.use(sinonChai);
const { expect, should } = chai;
should();

let token;

describe('Verfied social user', () => {
  afterEach(sinon.restore);
  it('should create a new user', async () => {
    const req = {
      user: {
        user: {
          id: '2',
          email: 'isaih@gamil.com'
        }
      }
    };

    const res = {
      status() {},
      send() {},
    };
    sinon.stub(res, 'status').returnsThis();
    await getUserToken(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it('should return an error when a user is not valid', async () => {
    const req = {};

    const res = {
      status() {},
      send() {},
    };
    sinon.stub(res, 'status').returnsThis();
    await getUserToken(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });

  before(() => {
    token = jwtUtil.generateToken(expirationTime, payLoad);
  });
  it('should return next function when token is valid', () => {
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
  it('should return error when token is invalid on social login', () => {
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
  it('Should return error when token is expired on social login', () => {
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
  it('should return user detail from the social media', async () => {
    let accessToken, refreshToken;
    const profile = {
      displayName: 'Afolayan kunle',
      emails: [{ value: 'iafolayan@gmail.com' }]
    };
    const done = () => { };
    await socailLoginsCallback(accessToken, refreshToken, profile, done);
    expect(done).to.be.a('function');
    expect(profile).to.be.an('object');
    expect(profile.displayName).to.be.a('string');
  });
  it('should display user information from the database', async () => {
    const emails = [{ value: 'iafolayan@gmail.com' }];
    const name = ['Afoolayan', 'Isaiah'];
    const query = await User.findOrCreateUser(emails, name);
    expect(query[0].dataValues).to.haveOwnProperty('email');
    expect(query[0].dataValues).to.haveOwnProperty('password');
    expect(query[0].dataValues).to.haveOwnProperty('firstname');
    expect(query[0].dataValues).to.haveOwnProperty('lastname');
    expect(query[0].dataValues).to.haveOwnProperty('isverified').to.be.eql(true);
  });
});
