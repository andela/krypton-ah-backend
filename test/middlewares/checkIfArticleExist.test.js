const chai = require('chai'),
  sinon = require('sinon'),
  articleExist = require('../../middlewares/checkIfArticleExist'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  articles = require('../../lib/modelManagers/articlemodel'),
  mockData = require('../mockData'),
  {
    SERVER_ERROR_MESSAGE,
    NOT_FOUND_CODE,
    ARTICLE_NOT_FOUND,
    SERVER_ERROR_CODE
  } = require('../../constants/index'),
  { expect } = chai;

let newArticle = { };
describe('Function that checks if articleId exist', () => {
  afterEach(() => sinon.restore());
  const userData1 = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  after('Delete Tables', async () => {
    mockData.destroyData();
  });


  before(async () => {
    mockData.destroyData();
    const user1 = await UserModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const articleMockData = mockData.article(user1.dataValues.id);
    newArticle = await articles.createArticle(articleMockData);
  });

  it('should return Article not found, if article id does not exist', async () => {
    const req = {
      body: {
        articleId: mockData.articleId
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await articleExist(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(ARTICLE_NOT_FOUND);
  });

  it('should call next middleware function if articleId exist', async () => {
    const req = {
      body: {
        articleId: newArticle.dataValues.id
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    const nextMock = {
      next: () => {}
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(articles, 'getArticlesby').throws();
    await articleExist(req, res, nextMock.next);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });

  it('should call next middleware function if articleId exist', async () => {
    const req = {
      body: {
        articleId: newArticle.dataValues.id
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    const nextMock = {
      next: () => {}
    };

    const nextStub = sinon.stub(nextMock, 'next');
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await articleExist(req, res, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
});
