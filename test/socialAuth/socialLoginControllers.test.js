const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  socialMediaController = require('../../controllers/socialLoginControllers');

chai.use(sinonChai);
const { expect, should } = chai;
should();

describe('Verfied social user', () => {
  afterEach(sinon.restore);
  it('should create a new user', async () => {
    const req = {
      user: {
        id: '2',
        email: 'isaih@gamil.com'
      }
    };

    const res = {
      status() {},
      send() {},
    };
    sinon.stub(res, 'status').returnsThis();
    await socialMediaController.getUserToken(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it('should return an error when a user is not valid', async () => {
    const req = {};

    const res = {
      status() {},
      send() {},
    };
    sinon.stub(res, 'status').returnsThis();
    await socialMediaController.getUserToken(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });
});
describe('Social Media callback', () => {
  it('should return error when profile is not available', async () => {
    const profile = {
      displayName: 'Afolayan Isaiah',
      emails: [{ value: 'isaiah@author.com' }]
    };
    const done = () => {

    };
    await socialMediaController.socailLoginsCallback(null, null, profile, done);
  });
});
