const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../index');
const user = require('../../database/models').User;
const { Articles } = require('../../database/models');
const article = require('../../lib/modelManagers/articlemodel');
const { userprofile } = require('../../database/models');
const constants = require('../mockData');
const ArticlesController = require('../../controllers/Articles/articlesController');
const articleModelManager = require('../../lib/modelManagers/articlemodel');

chai.use(chaiHttp);

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
    res = await user.create(constants.userdata3).then(async (newUser) => {
      await userprofile.create(constants.userprofile3);
      return newUser;
    });
    userid = res.dataValues.id;
    testArticle = constants.article(userid);
    testArticle2 = constants.article(userid);
  });

  it('should successfully add a new article', async () => {
    const req = {
      decodedToken: {
        payLoad: userid
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
    const jsonStub = sinon.stub(res, 'json').returnsThis();
    await ArticlesController.createArticles(req, res);
    expect(statusStub.calledOnceWithExactly(200)).to.equal(true);
    expect(jsonStub.firstCall.args[0].success).to.equal(true);
  });


  it('should successfully update article details', async () => {
    const result = await article.createArticle(testArticle);
    articleid = result.dataValues.id;
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
    await ArticlesController.updateArticle(req, res);
    expect(statusStub.calledOnceWithExactly(200)).to.equal(true);
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
    expect(statusStub.calledOnceWithExactly(404)).to.equal(true);
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
    expect(statusStub.calledOnceWithExactly(500)).to.equal(true);
    expect(jsonStub.firstCall.args[0].success).to.equal(false);
  });

  it('should successfully delete an article', async () => {
    chai.request(app)
      .delete(`/api/v1/articles/${articleid}`)
      .end((err, res) => {
        expect(res.status).to.equals(200);
      });
  });


  it('should successfully delete an article', async () => {
    chai.request(app)
      .delete(`/api/v1/articles/${articleid}`)
      .end((err, res) => {
        expect(res.status).to.equals(404);
      });
  });

  it('should throw error when deleting an article', async () => {
    chai.request(app)
      .delete('/api/v1/articles/')
      .end((err, res) => {
        expect(res.status).to.equals(500);
      });
  });

  it('should get an article', async () => {
    chai.request(app)
      .get('/api/v1/articles')
      .send(testArticle)
      .end((err, res) => {
        expect(res.status).equals(200);
      });
  });

  it('should throw error when getting an article', async () => {
    const req = {
      decodedToken: {
        payLoad: userid
      },
      body: {

      },
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
    expect(statusStub.calledOnceWithExactly(500)).to.equal(false);
    await ArticlesController.getArticle(req, res);
    expect(jsonStub.firstCall.args[0].success).to.equal(false);
  });
});

describe('Articles controller', () => {
  before(async () => {
  });
  after('Delete Articles', async () => {
    sinon.restore();
  });
  it('should throw error when adding a new article', async () => {
    const { invalidarticle } = constants;
    const req = {
      decodedToken: {
        payLoad: userid
      },
      body: {
        title: 'hello',
        ...invalidarticle
      }
    };
    const res = {
      status: () => {},
      json: () => {}
    };
    const statusStub = sinon.stub(res, 'status').returnsThis();
    sinon.stub(articleModelManager, 'createArticle').throws();
    await ArticlesController.createArticles(req, res);
    expect(statusStub.calledOnceWithExactly(500)).to.equal(true);
  });
});
