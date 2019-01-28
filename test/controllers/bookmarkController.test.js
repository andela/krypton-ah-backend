const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  mockData = require('../mockData'),
  { createArticle } = require('../../lib/modelManagers/articlemodel'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  articleBookmark = require('../../controllers/bookmarkController'),
  bookmark = require('../../lib/modelManagers/bookmarkManager'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    SERVER_ERROR_MESSAGE,
    SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    BOOKMARKED,
    REMOVE_BOOKMARK,
    BOOKMARK_RETRIEVED,
    BOOKMARKED_ALREADY,
    CONFLICT_CODE,
    BOOKMARK_NOT_FOUND
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);

let newBookmark = {};

describe('Test Bookmark Controller', () => {
  const userData = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  before(async () => {
    const user = await UserModelManager.create(
      userData.email,
      userData.password,
      userData.firstname,
      userData.lastname
    );

    const articleMockData = mockData.article(user.dataValues.id);
    const writeUp = await createArticle(articleMockData);

    newBookmark = {
      articleId: writeUp.dataValues.id,
      userId: user.dataValues.id
    };
  });

  afterEach(() => sinon.restore());
  after('Delete Tables', async () => {
    mockData.destroyData();
  });

  context('Test controller that adds article bookmark for a user', () => {
    it('should send server error if database server is down when adding article to bookmark', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
        body: { },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleBookmark.bookmarkArticle(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    });

    it('should send information of new article bookmarked', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
        body: {
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleBookmark.bookmarkArticle(req, res);
      expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(BOOKMARKED);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('articleId').equal(newBookmark.articleId);
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('userId').equal(newBookmark.userId);
    });

    it('should return Article already bookmarked if article already exists in users bookmark', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
        body: {
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleBookmark.bookmarkArticle(req, res);
      expect(res.status).to.have.been.calledWith(CONFLICT_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(BOOKMARKED_ALREADY);
    });
  });

  context('Test controller that gets article from Bookmark for specific user', () => {
    it('should send information of articles bookmarked for specific user', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await articleBookmark.getArticlesBookmarked(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(BOOKMARK_RETRIEVED);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
      expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('count').to.equal(1);
      expect(res.json.firstCall.lastArg.data.articles).be.an('array').length(1);
      expect(res.json.firstCall.lastArg.data.articles[0]).to.haveOwnProperty('dataValues').be.an('object');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues).haveOwnProperty('createdAt');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues).haveOwnProperty('updatedAt');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues).to.haveOwnProperty('Article').be.an('object');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues.Article.dataValues).haveOwnProperty('id');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues.Article.dataValues).haveOwnProperty('title');
      expect(res.json.firstCall.lastArg.data.articles[0].dataValues.Article.dataValues).haveOwnProperty('featuredImageUrl');
    });

    it('should send not found error if userId or articleId is not found', async () => {
      const reviewerId = mockData.userdata3.id;
      const req = {
        decodedToken: {
          payLoad: reviewerId,
        },
        params: {
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await articleBookmark.getArticlesBookmarked(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(BOOKMARK_RETRIEVED);
      expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('count').to.equal(0);
      expect(res.json.firstCall.lastArg.data.articles).be.an('array').length(0);
    });

    it('should send server error if database server is down when getting users article', async () => {
      const reviewerId = mockData.userdata3.id;
      const req = {
        decodedToken: {
          payLoad: reviewerId,
        },
        params: {
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(bookmark, 'getBookmarkedArticles').throws();
      await articleBookmark.getArticlesBookmarked(req, res);

      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    });
  });

  context('Test controller that deletes article bookmarked for a user', () => {
    it('should send server error if database server is down when deleting article', async () => {
      const req = {
        decodedToken: {
          payLoad: ''
        },
        body: { },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(bookmark, 'deleteBookmark').throws();

      await articleBookmark.deleteBookmark(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    });

    it('should succesfully delete an article bookmarked', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
        body: {
          userId: newBookmark.userId,
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleBookmark.deleteBookmark(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(REMOVE_BOOKMARK);
    });

    it('should return Article not found in users bookmark if article does not exist', async () => {
      const req = {
        decodedToken: {
          payLoad: newBookmark.userId,
        },
        body: {
          userId: newBookmark.userId,
          articleId: newBookmark.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleBookmark.deleteBookmark(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(BOOKMARK_NOT_FOUND);
    });
  });
});
