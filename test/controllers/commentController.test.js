const chai = require('chai'),
  chaiHttp = require('chai-http'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  mockData = require('../mockData'),
  {
    createCommentController,
    findCommentController,
    findCommentThreadController,
    updateCommentController,
    deleteCommentController
  } = require('../../controllers/articlesCommentController'),
  { ArticlesComments, User, Articles } = require('../../database/models'),
  userModelManager = require('../../lib/modelManagers/usermodel'),
  articles = require('../../lib/modelManagers/articlemodel'),
  commentModelManager = require('../../lib/modelManagers/articlesComment'),
  {
    userSample,
    newArticle,
    comment1,
    comment2,
    options,
    shortComment1,
    shortComment2,
    shortComment3
  } = require('../mockData'),
  {
    COMMENT_CREATED,
    SERVER_ERROR_CODE,
    OK_CODE,
    NOT_FOUND_CODE,
    COMMENT_NOT_FOUND,
    COMMENT_SUCCESS_RETURN_MESSAGE,
    SERVER_ERROR_MESSAGE,
    COMMENT_UPDATED,
    COMMENT_DELETED,
    UNAUTHORIZED_CODE,
    UNAUTHORIZED_REQUEST
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

let newComment = {};
let newComment2 = {};
let newCommentId;
let newCommentId2;

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
    storage.comment = await commentModelManager.createComment({
      comment: comment1.comment,
      userId: comment1.userId,
      articleId: comment1.articleId,
      mainCommentId: null
    });
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
        decodedToken: {
          payLoad: storage.userdata.dataValues.id
        },
        body: {
          comment: comment2.comment,
          mainCommentId: null
        },
        params: {
          articleId: storage.article.dataValues.id
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
      storage.comment3 = await commentModelManager.createComment({
        comment: comment1.comment,
        userId: comment1.userId,
        articleId: comment1.articleId,
        mainCommentId: comment1.mainCommentId
      });
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
      storage.comment3 = await commentModelManager.createComment({
        comment: comment1.comment,
        userId: comment1.userId,
        articleId: comment1.articleId,
        mainCommentId: comment1.mainCommentId
      });
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
      storage.comment3 = await commentModelManager.createComment({
        comment: comment1.comment,
        userId: comment1.userId,
        articleId: comment1.articleId,
        mainCommentId: comment1.mainCommentId
      });
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

describe('Update comment controller test', () => {
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
    const user1 = await userModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const user2 = await userModelManager.create(
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
      comment: shortComment1
    };

    newComment2 = {
      articleId: writeUp.dataValues.id,
      userId: user2.dataValues.id,
      comment: shortComment2
    };

    const newCommentDetails = await commentModelManager.createComment({
      comment: newComment.comment,
      userId: newComment.userId,
      articleId: newComment.articleId,
      updated: false
    });

    newCommentId = newCommentDetails.dataValues.id;

    const newCommentDetails2 = await commentModelManager.createComment({
      comment: newComment2.comment,
      userId: newComment2.userId,
      articleId: newComment2.articleId,
      mainCommentId: newCommentId,
      originalId: newCommentId,
      deleted: false
    });

    newCommentId2 = newCommentDetails2.dataValues.id;
  });

  it('should return unauthorized if user is trying to update a comment or thread that is not his or hers', async () => {
    const { articleId } = newComment;
    const { userId } = newComment2;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await updateCommentController(req, res);

    expect(res.status).to.have.been.calledWith(UNAUTHORIZED_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(UNAUTHORIZED_REQUEST);
  });

  it('should update comment succesfully', async () => {
    const { userId, articleId } = newComment;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.spy(commentModelManager, 'findComment');
    sinon.spy(commentModelManager, 'updateArticleComment');
    sinon.spy(commentModelManager, 'createComment');
    sinon.spy(commentModelManager, 'updateAllCommentThreads');
    await updateCommentController(req, res);

    expect(commentModelManager.findComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateArticleComment.calledOnce).to.equal(true);
    expect(commentModelManager.createComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateAllCommentThreads.calledOnce).to.equal(true);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(COMMENT_UPDATED);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
    expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('dataValues').be.an('object');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('mainCommentId').equal(null);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('comment').equal(comment);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('articleId').equal(articleId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('userId').equal(userId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updated').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('deleted').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('createdAt');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updatedAt');
  });

  it('should update threads succesfully', async () => {
    const { userId, articleId } = newComment2;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId2,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await updateCommentController(req, res);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(COMMENT_UPDATED);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
    expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('dataValues').be.an('object');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('mainCommentId');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('comment').equal(comment);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('articleId').equal(articleId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('userId').equal(userId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updated').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('deleted').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('createdAt');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updatedAt');
  });

  it('should update only comment', async () => {
    const { userId, articleId } = newComment;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(commentModelManager, 'findComment').returns({ mainCommentId: newCommentId, userId });
    sinon.spy(commentModelManager, 'updateArticleComment');
    sinon.spy(commentModelManager, 'createComment');
    sinon.spy(commentModelManager, 'updateAllCommentThreads');
    await updateCommentController(req, res);

    expect(commentModelManager.findComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateArticleComment.calledOnce).to.equal(true);
    expect(commentModelManager.createComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateAllCommentThreads.calledOnce).to.equal(false);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(COMMENT_UPDATED);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
    expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('dataValues').be.an('object');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('comment').equal(comment);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('articleId').equal(articleId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('userId').equal(userId);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updated').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('deleted').equal(false);
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('createdAt');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('updatedAt');
  });

  it('should return server error when database server is down', async () => {
    const { userId, articleId } = newComment;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(commentModelManager, 'findComment').throws();
    sinon.spy(commentModelManager, 'updateArticleComment');
    sinon.spy(commentModelManager, 'createComment');
    sinon.spy(commentModelManager, 'updateAllCommentThreads');
    await updateCommentController(req, res);

    expect(commentModelManager.findComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateArticleComment.calledOnce).to.equal(false);
    expect(commentModelManager.createComment.calledOnce).to.equal(false);
    expect(commentModelManager.updateAllCommentThreads.calledOnce).to.equal(false);

    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
});

describe('Delete comment controller test', () => {
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
    const user1 = await userModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const user2 = await userModelManager.create(
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
      comment: shortComment1
    };

    newComment2 = {
      articleId: writeUp.dataValues.id,
      userId: user2.dataValues.id,
      comment: shortComment2
    };

    const newCommentDetails = await commentModelManager.createComment({
      comment: newComment.comment,
      userId: newComment.userId,
      articleId: newComment.articleId,
      updated: false
    });

    newCommentId = newCommentDetails.dataValues.id;

    const newCommentDetails2 = await commentModelManager.createComment({
      comment: newComment2.comment,
      userId: newComment2.userId,
      articleId: newComment2.articleId,
      mainCommentId: newCommentId,
      deleted: false
    });

    newCommentId2 = newCommentDetails2.dataValues.id;
  });

  it('should return unauthorized if user is trying to delete a comment or thread that is not his or hers', async () => {
    const { articleId } = newComment;
    const { userId } = newComment2;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await deleteCommentController(req, res);

    expect(res.status).to.have.been.calledWith(UNAUTHORIZED_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(UNAUTHORIZED_REQUEST);
  });

  it('should delete comment succesfully', async () => {
    const { userId, articleId } = newComment;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await deleteCommentController(req, res);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(COMMENT_DELETED);
  });

  it('should delete threads succesfully', async () => {
    const { userId, articleId } = newComment2;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId2
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await deleteCommentController(req, res);

    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(COMMENT_DELETED);
  });

  it('should return server error when database server is down', async () => {
    const { userId, articleId } = newComment;
    const comment = shortComment3;
    const req = {
      decodedToken: {
        payLoad: userId
      },
      body: {
        commentId: newCommentId,
        comment
      },
      params: { articleId },
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(commentModelManager, 'findComment').throws();
    sinon.spy(commentModelManager, 'updateArticleComment');
    sinon.spy(commentModelManager, 'createComment');
    sinon.spy(commentModelManager, 'updateAllCommentThreads');

    await deleteCommentController(req, res);

    expect(commentModelManager.findComment.calledOnce).to.equal(true);
    expect(commentModelManager.updateArticleComment.calledOnce).to.equal(false);
    expect(commentModelManager.createComment.calledOnce).to.equal(false);
    expect(commentModelManager.updateAllCommentThreads.calledOnce).to.equal(false);

    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
});
