const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  checkEmail = require('../../middlewares/checkEmail'),
  User = require('../../lib/modelManagers/usermodel'),
  { SERVER_ERROR_CODE, CONFLICT_CODE } = require('../../constants');

chai.use(sinonChai);
const { expect, should } = chai;
should();
describe('check email', () => {
  describe('Check if Email Exist Test', () => {
    afterEach(sinon.restore);
    it('should not allow user to signup if email already exist', async () => {
      const req = {
        body: {
          email: 'fakeemail'
        }
      };

      const res = {
        status() {},
        json() {}
      };
      const next = () => {};

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(User, 'findUserByEmail').returns(true);
      await checkEmail(req, res, next);
      expect(res.status).to.have.been.calledWith(CONFLICT_CODE);
    });

    it('should allow user to signup if email does not already exist', async () => {
      const req = {
        body: {
          email: 'fakeemail'
        }
      };

      const res = {
        status() {},
        json() {}
      };

      const next = sinon.stub();
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(User, 'findUserByEmail').returns(false);
      await checkEmail(req, res, next);
      expect(next).to.have.been.calledOnce; // eslint-disable-line
    });

    it('should throw an error incase of server error', async () => {
      const req = {};

      const res = {
        status() {},
        json() {}
      };

      const next = sinon.stub();
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(User, 'findUserByEmail').throws();

      await checkEmail(req, res, next);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
});
