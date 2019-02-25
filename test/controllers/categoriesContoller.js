const chaiHttp = require('chai-http'),
  chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect } = require('chai'),
  categoriesController = require('../../controllers/categories'),
  categoriesModelManager = require('../../lib/modelManagers/categoriesModel'),
  { categories } = require('../../database/models'),
  user = require('../../database/models').User,
  { OK_CODE } = require('../../constants/index'),
  Article = require('../../lib/modelManagers/articlemodel'),
  {
    userdata,
    reportTagName,
  } = require('../mockData');


chai.use(chaiHttp);
chai.use(sinonChai);

let res, userid;

describe('Test report controller', () => {
  after('Delete Table report', async () => {
    await user.destroy({
      where: {}
    });
    await categories.destroy({
      where: {}
    });
  });
  before(async () => {
    res = await user.create(userdata);
    userid = res.dataValues.id;
    await categoriesModelManager.createCategory(reportTagName);
  });

  afterEach(sinon.restore);

  it('should create a category', async () => {
    const id = userid;
    const req = {
      body: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await categoriesController.createCategory(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });

  it('should create a category', async () => {
    const id = userid;
    const req = {
      body: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'createCategory').throws();
    await categoriesController.createCategory(req, res);
  });

  it('should get all categories', async () => {
    const id = userid;
    const req = {
      body: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await categoriesController.getAllCategories(req, res);
  });

  it('should return an error when getting all categories', async () => {
    const id = userid;
    const req = {
      body: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'getAllCategories').throws();
    await categoriesController.getAllCategories(req, res);
  });

  it('should return an error when deleting categories', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'deleteCategory').throws();
    await categoriesController.deleteCategories(req, res);
  });

  it('should return delete category', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(Article, 'getArticlesByCategory').returns(false);
    sinon.stub(categoriesModelManager, 'deleteCategory').returns(true);
    await categoriesController.deleteCategories(req, res);
  });

  it('should return delete category', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(Article, 'getArticlesByCategory').throws();
    await categoriesController.deleteCategories(req, res);
  });

  it('should get catgories', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'getCategory');
    await categoriesController.getCategories(req, res);
  });

  it('should return an error when getting catgories', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'getCategory').throws();
    await categoriesController.getCategories(req, res);
  });

  it('should get catgories', async () => {
    const id = userid;
    const req = {
      params: {
        category: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'getCategory').throws();
    await categoriesController.getCategories(req, res);
  });

  it('should create a catgory', async () => {
    const id = userid;
    const req = {
      params: {
        body: 'testcategory',
      },
      decodedToken: {
        payLoad: {
          id
        }
      },
      query: {
        limit: 5,
        offset: 0
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    sinon.stub(categoriesModelManager, 'createCategory').throws();
    await categoriesController.getCategories(req, res);
  });

  it('should return a conflict error', async () => {
    const id = userid;
    const req = {
      body: {
        category: reportTagName
      },
      decodedToken: {
        payLoad: {
          id
        }
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await categoriesController.createCategory(req, res);
  });
});
