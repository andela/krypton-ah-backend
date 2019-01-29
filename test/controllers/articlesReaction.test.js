const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  {
    allReactions,
    likeOrDislike,
    cancelReaction
  } = require('../../controllers/articlesReactionController');
const { Articles, ArticlesReactions } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const { article, articleReaction, destroyData } = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata4;

let newUser, newArticle, req, newReaction;
chai.use(sinonChai);
chai.use(should);
describe('Test for articles reaction controller', () => {
  beforeEach(async () => {
    destroyData();
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newReaction = await ArticlesReactions.create(articleReaction(newArticle.id, newUser.id));
    req = {
      params: {
        articleId: newArticle.id
      },
      query: {
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

  it('Should get all likes for an article', async () => {
    const res = {
      status() {},
      json() {}
    };
    sinon.stub(res, 'status').returnsThis();
    await allReactions(req, res);
    expect(res.status).to.have.been.calledWith(200);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  it('Should delete an existing reaction on an article', async () => {
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
  it('Should throw an error when trying to react on an invalid reaction', async () => {
    req = {
      params: {
        articleId: '65719288-0395'
      },
      query: {
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
  it('Should throw an error when trying to get all reactions', async () => {
    req = {
      params: {
        articleId: '65719288-0395'
      },
      query: {
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
    await allReactions(req, res);
    expect(res.status).to.have.been.calledWith(500);
    res.status.called.should.equal(true);
    res.status.callCount.should.equal(1);
  });
  describe('Test for creation of a new reaction on an article', () => {
    beforeEach(async () => {
      destroyData();
      newUser = await create(email, password, firstname, lastname);
      newArticle = await Articles.create(article(newUser.id));

      req = {
        params: {
          articleId: newArticle.id
        },
        query: {
          reaction: 'like'
        },
        decodedToken: {
          payLoad: newUser.id
        }
      };
    });
    it('Should create a new reaction', async () => {
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
  });
});
