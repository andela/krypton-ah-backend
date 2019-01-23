const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  {
    verifyCommentId,
    validateReaction,
    likeDislikeReset
  } = require('../../controllers/commentsReactionController');
const { User, Articles, articlesComments } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const { article, comment } = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata3;

let newUser, newArticle, newComment, req;
chai.use(sinonChai);
chai.use(should);
describe('Test for comment reaction controller', () => {
  before(async () => {
    User.destroy({
      where: {}
    });
    Articles.destroy({
      where: {}
    });
    articlesComments.destroy({
      where: {}
    });
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newComment = await articlesComments.create(comment(newArticle.id, newUser.id));
    req = {
      params: {
        commentId: newComment.id,
        reaction: 'like'
      },
      decodedToken: {
        payLoad: newUser.id
      }
    };
  });
  afterEach(async () => {
    User.destroy({
      where: {}
    });
    Articles.destroy({
      where: {}
    });
    articlesComments.destroy({
      where: {}
    });
  });
  it('Should return next function when commenId exist', async () => {
    const res = {
      status() {},
      json() {}
    };
    const next = sinon.stub();
    sinon.stub(res, 'status').returnsThis();
    await verifyCommentId(req, res, next);
    expect(next.calledOnce).to.be.eq(true);
  });
  it('Should not return next function when commenId does not exist', async () => {
    const req = {
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
    expect(next.calledOnce).to.be.eq(false);
    expect(res.status).to.have.been.calledWith(404);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should not return next function when id is not a uuid', async () => {
    const req = {
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
    expect(next.calledOnce).to.be.eq(false);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  describe('Test make sure reactions are only like or dislike', () => {
    it('Should return next when reaction is  like or dislike', () => {
      const req = {
        params: {
          reaction: 'like' || 'dislike'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      const next = sinon.stub();
      sinon.stub(res, 'status').returnsThis();
      validateReaction(req, res, next);
      expect(next.calledOnce).to.be.eq(true);
    });
    it('Should not return next when reaction is not like or dislike', () => {
      const req = {
        params: {
          reaction: 'liked' || 'disliked'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      const next = sinon.stub();
      sinon.stub(res, 'status').returnsThis();
      validateReaction(req, res, next);
      expect(next.calledOnce).to.be.eq(false);
      expect(res.status).to.have.been.calledWith(500);
      res.status.called.should.equal(true);
      res.status.callCount.should.equal(1);
    });
  });

  describe('Test like,unlike or reset reaction', () => {
    before(async () => {
      User.destroy({
        where: {}
      });
      Articles.destroy({
        where: {}
      });
      articlesComments.destroy({
        where: {}
      });
      newUser = await create(email, password, firstname, lastname);
      newArticle = await Articles.create(article(newUser.id));
      newComment = await articlesComments.create(comment(newArticle.id, newUser.id));
      req = {
        params: {
          commentId: newComment.id,
          reaction: 'like'
        },
        decodedToken: {
          payLoad: newUser.id
        }
      };
    });
    it('Should return success when a user changes reaction', async () => {
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      await likeDislikeReset(req, res);
      expect(res.status).to.have.been.calledWith(200);
      res.status.called.should.equal(true);
      res.status.callCount.should.equal(1);
    });
    it('Should return error when invalid data is sent', async () => {
      req = {
        params: {
          commentId: '65719288-0395',
          reaction: 'like'
        },
        decodedToken: {
          payLoad: newUser.id
        }
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      await likeDislikeReset(req, res);
      expect(res.status).to.have.been.calledWith(500);
      res.status.called.should.equal(true);
      res.status.callCount.should.equal(1);
    });
  });
});
