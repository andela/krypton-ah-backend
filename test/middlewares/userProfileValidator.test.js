const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  sinon = require('sinon'),
  userProfileValidator = require('../../middlewares/userProfileValidator'),
  {
    validProfileRequestMock,
    nextMock,
    responseMock,
    invalidProfileRequestMock,
    BAD_REQUEST_CODE,
    VALIDATE_URL_ERROR,
    VALIDATE_GENDER_ERROR,
    VALIDATE_EMAIL_NOTIFICATION_ERROR,
    VALIDATE_PHONENUMBER_ERROR,
    VALIDATE_USERNAME_ERROR
  } = require('../../constants');

describe('User profile validator', async () => {
  let req;
  describe('validate valid profile and call next funtion', () => {
    before(async () => {
      await expressValidator(validProfileRequestMock, {}, () => {
        req = validProfileRequestMock;
      });
    });
    after(() => {
      nextMock.next.restore();
    });
    it('should validate valid profile and call next function', async () => {
      const nextStub = sinon.stub(nextMock, 'next');
      await userProfileValidator(req, responseMock, nextMock.next);
      expect(nextStub.calledOnce).to.equal(true);
    });
  });
  describe('Invalidate invalid profile and return errors', () => {
    before(async () => {
      await expressValidator(invalidProfileRequestMock, {}, () => {
        req = invalidProfileRequestMock;
      });
    });
    after(() => {
      nextMock.next.restore();
      responseMock.json.restore();
      responseMock.status.restore();
    });
    it('should not validate invalid profile parameters', async () => {
      const nextStub = sinon.stub(nextMock, 'next');
      const responseMockStub = sinon.stub(responseMock, 'status').returnsThis();
      const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
      await userProfileValidator(req, responseMock, nextMock.next);
      expect(nextStub.notCalled).to.equal(true);
      expect(responseMockStub.calledOnceWithExactly(BAD_REQUEST_CODE)).to.equal(true);
      expect(jsonStub.called).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(false);
      expect(jsonStub.firstCall.args[0].message.avatar[0])
        .to.equal(`avatar ${VALIDATE_URL_ERROR}`);
      expect(jsonStub.firstCall.args[0].message.gender[0])
        .to.equal(VALIDATE_GENDER_ERROR);
      expect(jsonStub.firstCall.args[0].message.phonenumber[0])
        .to.equal(VALIDATE_PHONENUMBER_ERROR);
      expect(jsonStub.firstCall.args[0].message.username[0])
        .to.equal(VALIDATE_USERNAME_ERROR);
      expect(jsonStub.firstCall.args[0].message.emailnotification[0])
        .to.equal(VALIDATE_EMAIL_NOTIFICATION_ERROR);
    });
  });
});
