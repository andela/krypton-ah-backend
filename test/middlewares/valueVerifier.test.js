const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  {
    verifyCommentId,
    validateReaction,
    verifyArticleId
  } = require('../../middlewares/valueVerifier');
const { Articles, ArticlesComments, CommentsReactions } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const {
  article, comment, reaction, destroyData
} = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata3;

let newUser, newArticle, newComment, req, newReaction;
chai.use(sinonChai);
chai.use(should);
describe('Test for comment reaction controller', () => {
  before(async () => {
    destroyData();
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newComment = await ArticlesComments.create(comment(newArticle.id, newUser.id));
    newReaction = await CommentsReactions.create(reaction(newComment.id, newUser.id));
    req = {
      params: {
        commentId: newComment.id,
        reactionId: newReaction.id,
        articleId: newArticle.id,
        reaction: 'like'
      },
      decodedToken: {
        payLoad: newUser.id
      }
    };
  });
  after(() => {
    destroyData();
  });

  it('Should get a comment and call next', async () => {
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyCommentId(req, res, next);
    expect(next.calledOnce).to.be.eq(true);
  });
  it('Should error message for unknown comment id', async () => {
    req = {
      params: {
        commentId: '65719288-0395-445e-b587-2b98b70bdec9'
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyCommentId(req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should return a server error for invalid comment id', async () => {
    req = {
      params: {
        commentId: '65719288-0395'
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyCommentId(req, res, next);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should get an article and call next', async () => {
    req = {
      params: {
        articleId: newArticle.id
      },
      decodedToken: {
        payLoad: newUser.id
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyArticleId(req, res, next);
    expect(next.calledOnce).to.be.eq(true);
  });
  it('Should error message for unknown article id', async () => {
    req = {
      params: {
        articleId: '65719288-0395-445e-b587-2b98b70bdec2'
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyArticleId(req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should return a server error for invalid article id', async () => {
    req = {
      params: {
        articleId: '65719288-0395'
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyArticleId(req, res, next);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });

  it('Should make sure reaction is like or dislike', async () => {
    req = {
      query: {
        reaction: 'like'
      },
      params: {}
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await validateReaction(req, res, next);
    expect(next.calledOnce).to.be.eq(true);
  });
  it('Should return error if reaction is not like or dislike', async () => {
    req = {
      query: {
        reaction: 'like'
      },
      params: {
        reaction
      }
    };
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await validateReaction(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
});
