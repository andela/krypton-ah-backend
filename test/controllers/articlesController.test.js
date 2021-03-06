const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const app = require('../../index');
const user = require('../../database/models').User;
const { Articles } = require('../../database/models');
const article = require('../../lib/modelManagers/articlemodel');
const { userprofile } = require('../../database/models');
const constants = require('../mockData');
const ArticlesController = require('../../controllers/Articles/articlesController');
const articleModelManager = require('../../lib/modelManagers/articlemodel');
const tagGenerator = require('../../lib/utils/tagGenarator');
const responses = require('../../constants/index');
const helpers = require('../../lib/utils/helpers');
const { sampleFoundArticle } = require('../mockData');
const categoryModelManager = require('../../lib/modelManagers/categoriesModel');

chai.use(chaiHttp);
chai.use(sinonChai);

let res;
let userid;
let testArticle;
let testArticle2;

describe('Articles controller', () => {
  let articleid;
  after('Delete Articles', async () => {
    Articles.destroy({
      where: {}
    });
  });
  before(async () => {
    user.destroy({
      where: {}
    });
    res = await user.create(constants.userdata3).then(async (newUser) => {
      await userprofile.create(constants.userprofile3);
      return newUser;
    });
    userid = res.id;
    testArticle = constants.article(userid);
    testArticle2 = constants.article(userid);
  });

  it('should successfully add a new article', async () => {
    const req = {
      decodedToken: {
        payLoad: {
          id: userid
        }
      },
      body: {
        ...testArticle
      }
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };

    const nextMock = {
      next: () => {}
    };

    const nextStub = sinon.stub(nextMock, 'next');
    await ArticlesController.createArticles(req, res, nextMock.next);
    sinon.stub(categoryModelManager, 'createCategory').returns(true);
    expect(nextStub.calledOnce).to.equal(true);
  });

  it('should successfully update article details', async () => {
    const result = await article.createArticle(testArticle);
    articleid = result.id;
    const req = {
      decodedToken: {
        payLoad: userid
      },
      body: {
        ...testArticle2
      },
      params: {
        id: articleid
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };
    const statusStub = sinon.stub(res, 'status').returnsThis();
    const jsonStub = sinon.stub(res, 'json').returnsThis();
    await tagGenerator(constants.tags.tag, articleid);
    await ArticlesController.updateArticle(req, res);
    expect(statusStub.calledOnceWithExactly(responses.OK_CODE)).to.equal(true);
    expect(jsonStub.firstCall.args[0].success).to.equal(true);
  });

  it('should fail to update article details when id is invlaid', async () => {
    const article3id = '3d41d653-13e1-45c6-8727-2f3c2bfe8e84';
    const req = {
      decodedToken: {
        payLoad: userid
      },
      body: {
        ...testArticle2
      },
      params: {
        id: article3id
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };
    const statusStub = sinon.stub(res, 'status').returnsThis();
    const jsonStub = sinon.stub(res, 'json').returnsThis();
    await ArticlesController.updateArticle(req, res);
    expect(statusStub.calledOnceWithExactly(responses.NOT_FOUND_CODE)).to.equal(true);
    expect(jsonStub.firstCall.args[0].success).to.equal(false);
  });

  it('should throw error when updating article details', async () => {
    const { invalidarticle } = constants;
    const req = {
      decodedToken: {
        payLoad: ''
      },
      body: {
        ...invalidarticle
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };
    const statusStub = sinon.stub(res, 'status').returnsThis();
    const jsonStub = sinon.stub(res, 'json').returnsThis();
    await ArticlesController.updateArticle(req, res);
    expect(statusStub.calledOnceWithExactly(responses.SERVER_ERROR_CODE)).to.equal(true);
    expect(jsonStub.firstCall.args[0].success).to.equal(false);
  });

  it('should successfully delete an article', async () => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${articleid}`)
      .end((err, res) => {
        expect(res.status).to.equals(responses.OK_CODE);
      });
  });

  it('should successfully delete an article', async () => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${articleid}`)
      .end((err, res) => {
        expect(res.status).to.equals(responses.NOT_FOUND_CODE);
      });
  });

  it('should throw error when deleting an article', async () => {
    chai
      .request(app)
      .delete('/api/v1/articles/a')
      .end((err, res) => {
        expect(res.status).to.equals(responses.SERVER_ERROR_CODE);
      });
  });

  it('should get an article', async () => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .send(testArticle)
      .end((err, res) => {
        expect(res.status).equals(responses.OK_CODE);
      });
  });

  it('should throw error when getting an article', async () => {
    const req = {
      decodedToken: {
        payLoad: userid
      },
      body: {},
      params: {
        field: '',
        value: ''
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };

    const statusStub = sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'getArticlesby').throws();
    const jsonStub = sinon.stub(res, 'json').returnsThis();
    expect(statusStub.calledOnceWithExactly(responses.SERVER_ERROR_CODE)).to.equal(false);
    await ArticlesController.getArticle(req, res);
    expect(jsonStub.firstCall.args[0].success).to.equal(false);
  });
});

describe('Articles controller', () => {
  before(async () => {});
  after('Delete Articles', async () => {
    sinon.restore();
  });
  it('should throw error when adding a new article', async () => {
    const req = {
      decodedToken: {
        payLoad: {
          id: userid
        }
      },
      body: {
        ...testArticle
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };
    const statusStub = sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'createArticle').throws();
    await ArticlesController.createArticles(req, res);
    expect(statusStub.calledOnceWithExactly(responses.SERVER_ERROR_CODE)).to.equal(true);
  });
});

describe('getArticle controller', () => {
  const dataStore = {};
  afterEach(() => {
    constants.destroyData();
    sinon.restore();
  });
  beforeEach(async () => {
    dataStore.newUser = await user.create(constants.userdata2);
    dataStore.newUser2 = await user.create(constants.userdata);
    dataStore.articleMock = constants.goodArticle(dataStore.newUser.id);
    dataStore.newArticle = await articleModelManager.createArticle(dataStore.articleMock);
  });
  it('should get article and call next', async () => {
    const { responseMock, requestMock, nextMock } = responses;
    requestMock.params = { id: dataStore.newArticle.id };
    requestMock.decodedToken = { payLoad: { id: dataStore.newUser2.id } };
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
    const nextStub = sinon.stub(nextMock, 'next');
    await ArticlesController.getArticle(requestMock, responseMock, nextMock.next);
    expect(statusStub.calledOnceWithExactly(responses.OK_CODE)).to.equal(true);
    expect(jsonStub.calledOnce).to.equal(true);
    expect(nextStub.called);
  });
  it('should return not found error', async () => {
    const { responseMock, requestMock } = responses;
    requestMock.params = { id: constants.userdata3.id };
    requestMock.decodedToken = { payLoad: { id: dataStore.newUser2.id } };
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
    await ArticlesController.getArticle(requestMock, responseMock);
    expect(statusStub.calledOnceWithExactly(responses.NOT_FOUND_CODE)).to.equal(true);
    expect(jsonStub.calledOnce).to.equal(true);
  });
});

describe('articles controller search functions', async () => {
  const req = {
    query: {
      value: 'this'
    }
  };
  const res = {
    status() {},
    json() {}
  };
  afterEach('restore sinon', () => {
    sinon.restore();
  });
  it('should search articles by author', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'getArticlesByAuthor').returns(sampleFoundArticle);
    await ArticlesController.searchByAuthor(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });

  it('should search articles by author', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'getArticlesByTitle').returns(sampleFoundArticle);
    await ArticlesController.searchByTitle(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });

  it('should search articles by category', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'getArticlesByCategory').returns(sampleFoundArticle);
    await ArticlesController.searchByCategory(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });

  it('should search articles by author', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.spy(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'getArticlesByTag').returns(sampleFoundArticle);
    await ArticlesController.searchByTag(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });

  it('should get popular articles', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.spy(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'filterPopularArticles').returns(sampleFoundArticle);
    await ArticlesController.getPopularArticles(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });

  it('should search articles by keyword', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.spy(helpers, 'searchResult');
    sinon.stub(articleModelManager, 'getArticlesByKeyword').returns(sampleFoundArticle);
    await ArticlesController.searchByKeyword(req, res);
    await helpers.searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(responses.OK_CODE);
  });
  it('should return a server error when there is one', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'getArticlesByTitle').throws();
    await ArticlesController.searchByTitle(req, res);
    expect(res.status).to.have.been.calledWith(responses.SERVER_ERROR_CODE);
  });

  it('should return a server error when there is one', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'filterPopularArticles').throws();
    await ArticlesController.getPopularArticles(req, res);
    expect(res.status).to.have.been.calledWith(responses.SERVER_ERROR_CODE);
  });

  it('should return a server error when there is one', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'getArticlesByAuthor').throws();
    await ArticlesController.searchByAuthor(req, res);
    expect(res.status).to.have.been.calledWith(responses.SERVER_ERROR_CODE);
  });
  it('should return a server error when there is one', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'getArticlesByTag').throws();
    await ArticlesController.searchByTag(req, res);
    expect(res.status).to.have.been.calledWith(responses.SERVER_ERROR_CODE);
  });
  it('should return a server error when there is one', async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'getArticlesByKeyword').throws();
    await ArticlesController.searchByKeyword(req, res);
    expect(res.status).to.have.been.calledWith(responses.SERVER_ERROR_CODE);
  });
});
