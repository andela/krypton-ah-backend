const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  sinon = require('sinon'),
  {
    nextMock,
    responseMock,
    requestMock,
    BAD_REQUEST_CODE
  } = require('../../constants'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  { badArticle, goodArticle, userdata } = require('../mockData'),
  { User } = require('../../database/models'),
  articleValidator = require('../../middlewares/articleValidator');

describe('Article validator', async () => {
  let req;
  describe('validate article and call next funtion', () => {
    before(async () => {
      const newUser = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      const articleMock = goodArticle(newUser.id);
      articleMock.title = 'New Title';
      articleMock.authorId = newUser.id;
      requestMock.decodedToken = { payLoad: newUser.id };
      requestMock.body = { ...articleMock };
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    after(() => {
      User.destroy({
        where: {}
      });
      nextMock.next.restore();
    });
    it('should validate article and call next function', async () => {
      const nextStub = sinon.stub(nextMock, 'next');
      await articleValidator({ ...req }, responseMock, nextMock.next);
      expect(nextStub.calledOnce).to.equal(true);
    });
  });
  describe('validate article and call next funtion', () => {
    before(async () => {
      const newUser = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      const articleMock = badArticle(newUser.id);
      articleMock.title = 'bad';
      articleMock.authorId = newUser.id;
      requestMock.decodedToken = { payLoad: newUser.id };
      requestMock.body = { ...articleMock };
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    after(() => {
      User.destroy({
        where: {}
      });
      nextMock.next.restore();
      responseMock.json.restore();
      responseMock.status.restore();
    });
    it('should validate article and call next function', async () => {
      const nextStub = sinon.stub(nextMock, 'next');
      const responseMockStub = sinon.stub(responseMock, 'status').returnsThis();
      const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
      await articleValidator({ ...req }, responseMock, nextMock.next);
      expect(nextStub.notCalled).to.equal(true);
      expect(jsonStub.called).to.equal(true);
      expect(responseMockStub.calledOnceWithExactly(BAD_REQUEST_CODE)).to.equal(true);
      expect(responseMockStub.called).to.equal(true);
      expect(jsonStub.called).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(false);
    });
  });
});
