const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  articles = require('../../lib/modelManagers/articlemodel'),
  articleComment = require('../../lib/modelManagers/articlesComment'),
  commentHistory = require('../../lib/modelManagers/commentsHistoryModel'),
  userController = require('../../controllers/Users/userController'),
  User = require('../../lib/modelManagers/usermodel'),
  mockData = require('../mockData'),
  {
    OK_CODE,
    NOT_FOUND_CODE,
    SERVER_ERROR_MESSAGE,
    SERVER_ERROR_CODE,
    HISTORY_RETRIEVED,
    requestMock,
    responseMock
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);

chai.use(sinonChai);
let newComment = {};
let newComment2 = {};
let newCommentId;

describe('Unit test for comment history model manager', () => {
  const userData1 = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  const userData2 = {
    email: mockData.userdata2.email,
    password: mockData.userdata2.password,
    firstname: mockData.userdata2.firstname,
    lastname: mockData.userdata2.lastname
  };

  afterEach(() => sinon.restore());
  after('Delete Tables', async () => {
    mockData.destroyData();
  });

  before(async () => {
    const user1 = await UserModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const user2 = await UserModelManager.create(
      userData2.email,
      userData2.password,
      userData2.firstname,
      userData2.lastname
    );

    const articleMockData = mockData.article(user1.dataValues.id);
    const writeUp = await articles.createArticle(articleMockData);

    newComment = {
      articleId: writeUp.dataValues.id,
      userId: user1.dataValues.id,
      comment: mockData.shortComment1
    };

    newComment2 = {
      articleId: writeUp.dataValues.id,
      userId: user2.dataValues.id,
      comment: mockData.shortComment2
    };

    const newCommentDetails = await articleComment.createComment({
      comment: newComment.comment,
      userId: newComment.userId,
      articleId: newComment.articleId,
      updated: true
    });

    newCommentId = newCommentDetails.dataValues.id;

    await articleComment.createComment({
      comment: newComment2.comment,
      userId: newComment2.userId,
      articleId: newComment2.articleId,
      mainCommentId: newCommentId,
      deleted: true
    });
  });

  it('should get all users comment history', async () => {
    const { userId, articleId, comment } = newComment2;

    const req = {
      params: { userId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await userController.getModifiedComments(req, res);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(HISTORY_RETRIEVED);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('array');
    expect(res.json.firstCall.lastArg.data[0]).to.be.an('object');
    expect(res.json.firstCall.lastArg.data[0]).to.haveOwnProperty('dataValues').be.an('object');
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('id');
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('comment').equal(comment);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('userId').equal(userId);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('updated').equal(false);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('deleted').equal(true);
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('createdAt');
    expect(res.json.firstCall.lastArg.data[0].dataValues).to.haveOwnProperty('updatedAt');
  });

  it('should return server error when database server is down', async () => {
    const req = {
      params: { userId: 12 },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(commentHistory, 'getModifiedComments').throws();

    await userController.getModifiedComments(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
});


describe('getUser controller', () => {
  afterEach(sinon.restore);
  it('should successfully get user', async () => {
    const userId = mockData.userdata.id;
    requestMock.params = {
      userId
    };
    const getUserStub = await sinon.stub(User, 'getUser').returnsThis();
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    await userController.getUser(requestMock, responseMock);
    expect(statusStub.calledOnceWithExactly(OK_CODE)).to.equal(true);
    expect(getUserStub.calledOnceWithExactly(userId)).to.equal(true);
  });
  it('should return server error', async () => {
    const userId = mockData.userdata.id;
    requestMock.params = {
      userId
    };
    const getUserStub = await sinon.stub(User, 'getUser').rejects();
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    await userController.getUser(requestMock, responseMock);
    expect(statusStub.calledOnceWithExactly(SERVER_ERROR_CODE)).to.equal(true);
    expect(getUserStub.calledOnceWithExactly(userId)).to.equal(true);
  });
  it('should not successfully get user', async () => {
    const userId = mockData.userdata.id;
    requestMock.params = {
      userId
    };
    const getUserStub = await sinon.stub(User, 'getUser').returns(null);
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    await userController.getUser(requestMock, responseMock);
    expect(statusStub.calledOnceWithExactly(NOT_FOUND_CODE)).to.equal(true);
    expect(getUserStub.calledOnceWithExactly(userId)).to.equal(true);
  });
});
