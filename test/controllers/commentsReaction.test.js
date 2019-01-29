const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  { likeOrDislike, cancelReaction } = require('../../controllers/commentsReactionController');
const { Articles, ArticlesComments, CommentsReactions } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const {
  article, comment, reaction, destroyData
} = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata4;

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

  it('Should update an existing reaction', async () => {
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    await likeOrDislike(req, res);
    expect(res.status).to.have.been.calledWith(200);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should throw an error with invalid commentId', async () => {
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
    await likeOrDislike(req, res);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });

  it('Should throw an error with invalid commentId', async () => {
    req = {
      params: {
        reactionId: newReaction.id
      }
    };
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    await cancelReaction(req, res);
    expect(res.status).to.have.been.calledWith(200);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should throw an error with invalid reactionId', async () => {
    req = {
      params: {
        reactionId: '65719288-0395'
      }
    };
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    await cancelReaction(req, res);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  describe('Test for creation of a new reaction', () => {
    before(async () => {
      destroyData();
      newUser = await create(email, password, firstname, lastname);
      newArticle = await Articles.create(article(newUser.id));
      newComment = await ArticlesComments.create(comment(newArticle.id, newUser.id));
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
    afterEach(() => {
      destroyData();
    });
    it('Should create a new reaction', async () => {
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(res, 'status').returnsThis();
      await likeOrDislike(req, res);
      expect(res.status).to.have.been.calledWith(201);
      res.status.called.should.equal(true);
      res.status.callCount.should.equal(1);
    });
  });
});
