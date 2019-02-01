const chai = require('chai'),
  chaiHttp = require('chai-http'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  {
    createCommentController,
    findCommentController,
    findCommentThreadController
  } = require('../../controllers/articlesCommentController'),
  { ArticlesComments, User, Articles } = require('../../database/models'),
  userModelManager = require('../../lib/modelManagers/usermodel'),
  commentModelManager = require('../../lib/modelManagers/articlesComment'),
  {
    userSample, newArticle, comment1, comment2, options
  } = require('../mockData'),
  {
    COMMENT_CREATED,
    SERVER_ERROR_CODE,
    OK_CODE,
    NOT_FOUND_CODE,
    COMMENT_NOT_FOUND,
    COMMENT_SUCCESS_RETURN_MESSAGE
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Comment Controller', () => {
  const storage = {};
  before(async () => {
    ArticlesComments.destroy(options);
    User.destroy(options);
    Articles.destroy(options);
    storage.userdata = await userModelManager.create(
      userSample.email,
      userSample.password,
      userSample.firstname,
      userSample.lastname
    );
    newArticle.authorId = storage.userdata.dataValues.id;
    storage.article = await Articles.create(newArticle);
    comment1.userId = storage.userdata.dataValues.id;
    comment1.articleId = storage.article.dataValues.id;
    storage.comment = await commentModelManager.createComment(
      comment1.comment,
      comment1.userId,
      comment1.articleId
    );
  });
  after('Delete user', () => {
    if (storage.user) {
      ArticlesComments.destroy(options);
      Articles.destroy(options);
    }
    return sinon.restore();
  });
  describe('create comment controller', () => {
    afterEach(sinon.restore);
    it('should create comment', async () => {
      const req = {
        body: {
          comment: comment2.comment,
        },
        params: {
          articleId: storage.article.dataValues.id
        },
        decodedToken: {
          payLoad: storage.userdata.dataValues.id
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };

      const next = sinon.stub();

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await createCommentController(req, res, next);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_CREATED);
    });
    it('should throw server error incase of database error', async () => {
      const req = {
        body: {
          comment: comment2.comment,
          userId: storage.userdata.dataValues.id
        },
        params: {
          id: storage.article.dataValues.id
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(commentModelManager, 'createComment').throws();
      sinon.stub(res, 'status').returnsThis();
      await createCommentController(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  describe('get all comment controller', () => {
    afterEach(sinon.restore);
    it('should get all comment', async () => {
      const req = {
        params: {
          id: storage.comment.dataValues.articleId
        },
        query: {}
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await findCommentController(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_SUCCESS_RETURN_MESSAGE);
    });
    it('should not return comment not found message if not comment exist', async () => {
      const req = {
        params: {
          id: storage.article.dataValues.id
        },
        query: {
          page: 1
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(commentModelManager, 'findAllComment').returns([]);
      await findCommentController(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(false);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_NOT_FOUND);
    });
    it('should throw server error incase of database error', async () => {
      const req = {
        query: {
          q: 2
        },
        params: {
          id: storage.article.dataValues.id
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(commentModelManager, 'findAllComment').throws();
      sinon.stub(res, 'status').returnsThis();
      await findCommentController(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  describe('get single comment threads controller', () => {
    afterEach(sinon.restore);
    it('should get all comment', async () => {
      comment1.mainCommentId = storage.comment.dataValues.id;
      storage.comment3 = await commentModelManager.createComment(
        comment1.comment,
        comment1.userId,
        comment1.articleId,
        comment1.mainCommentId
      );
      const req = {
        params: {
          id: storage.article.dataValues.id,
          mainCommentId: storage.comment3.dataValues.mainCommentId
        },
        query: {
          limit: 1,
          page: 1
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await findCommentThreadController(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_SUCCESS_RETURN_MESSAGE);
    });
    it('should get default comment if req.query is not available', async () => {
      comment1.mainCommentId = storage.comment.dataValues.id;
      storage.comment3 = await commentModelManager.createComment(
        comment1.comment,
        comment1.userId,
        comment1.articleId,
        comment1.mainCommentId
      );
      const req = {
        params: {
          id: storage.article.dataValues.id,
          mainCommentId: storage.comment3.dataValues.mainCommentId
        },
        query: {}
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await findCommentThreadController(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_SUCCESS_RETURN_MESSAGE);
    });
    it('should get default comment if req.query is not available', async () => {
      comment1.mainCommentId = storage.comment.dataValues.id;
      storage.comment3 = await commentModelManager.createComment(
        comment1.comment,
        comment1.userId,
        comment1.articleId,
        comment1.mainCommentId
      );
      const req = {
        params: {
          id: storage.article.dataValues.id,
          mainCommentId: storage.comment3.dataValues.mainCommentId
        },
        query: {
          page: 1
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await findCommentThreadController(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_SUCCESS_RETURN_MESSAGE);
    });
    it('should return not found where no comment is returned', async () => {
      const req = {
        params: {
          id: storage.article.dataValues.id,
          mainCommentId: storage.comment3.dataValues.mainCommentId
        },
        query: {
          page: 2
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(commentModelManager, 'findCommentThreads').returns(false);
      await findCommentThreadController(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(false);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(COMMENT_NOT_FOUND);
    });
    it('should throw server error incase of database error', async () => {
      const req = {
        params: {
          id: storage.article.dataValues.id
        },
        query: {
          page: 2
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(commentModelManager, 'findCommentThreads').throws();
      sinon.stub(res, 'status').returnsThis();
      await findCommentThreadController(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
});
