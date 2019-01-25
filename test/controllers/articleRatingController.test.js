const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  mockData = require('../mockData'),
  { Articles, Rating, User } = require('../../database/models'),
  { createArticle } = require('../../lib/modelManagers/articlemodel'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  articleRating = require('../../controllers/articleRatingController'),
  rating = require('../../lib/modelManagers/articleRatingModel'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    SERVER_ERROR_MESSAGE,
    SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    GET_USER_RATING,
    GET_USER_RATING_ERROR,
    RATING_CREATED
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);

let newRating = {};

describe('Test Article Rating Controller', () => {
  const userData = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  before(async () => {
    const reviewer = await UserModelManager.create(
      userData.email,
      userData.password,
      userData.firstname,
      userData.lastname
    );

    const articleMockData = mockData.article(reviewer.dataValues.id);
    const writeUp = await createArticle(articleMockData);

    newRating = {
      articleId: writeUp.dataValues.id,
      reviewerId: reviewer.dataValues.id,
      rating: 5
    };
  });

  afterEach(() => sinon.restore());
  after('Delete Tables', async () => {
    Rating.destroy({
      where: {}
    });

    User.destroy({
      where: {}
    });

    Articles.destroy({
      where: {}
    });
  });

  context('Test controller that creates article rating', () => {
    it('should send server error if database server is down when creating users rating', async () => {
      const req = {
        body: { },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleRating.createRating(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    });

    it('should send information of new rating created', async () => {
      const req = {
        body: newRating,
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');

      await articleRating.createRating(req, res);
      expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(RATING_CREATED);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('articleId').equal(newRating.articleId);
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('reviewerId').equal(newRating.reviewerId);
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('rating').equal(newRating.rating);
    });
  });

  context('Test controller that gets user rating for a specific article', () => {
    it('should send information of a user rating for a specific article', async () => {
      const req = {
        params: {
          reviewerId: newRating.reviewerId,
          articleId: newRating.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await articleRating.getUserRating(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(GET_USER_RATING);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
      expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('dataValues').be.an('object');
      expect(Object.keys(res.json.firstCall.lastArg.data.dataValues).length).to.equal(1);
      expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('rating').equal(5);
    });

    it('should send not found error if userId or articleId is not found', async () => {
      const reviewerId = mockData.userdata3.id;
      const req = {
        params: {
          reviewerId,
          articleId: newRating.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await articleRating.getUserRating(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(GET_USER_RATING_ERROR);
    });

    it('should send server error if database server is down when getting users rating', async () => {
      const reviewerId = mockData.userdata3.id;
      const req = {
        params: {
          reviewerId,
          articleId: newRating.articleId
        },
      };
      const res = {
        status() { return this; },
        json() { }
      };

      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(rating, 'userRating').throws();
      await articleRating.getUserRating(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    });
  });
});
