const { expect } = require('chai');
const { Articles, Rating, User } = require('../../database/models');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const rating = require('../../lib/modelManagers/articleRatingModel');
const articles = require('../../lib/modelManagers/articlemodel');
const mockData = require('../mockData');

let res;
let newRating = {};
let newRating2 = {};
describe('Unit to Test Article Model Manager', () => {
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


  before(async () => {
    const reviewer1 = await UserModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const reviewer2 = await UserModelManager.create(
      userData2.email,
      userData2.password,
      userData2.firstname,
      userData2.lastname
    );

    const articleMockData = mockData.article(reviewer1.dataValues.id);
    const writeUp = await articles.createArticle(articleMockData);

    newRating = {
      articleId: writeUp.dataValues.id,
      reviewerId: reviewer1.dataValues.id,
      rating: 5
    };

    newRating2 = {
      articleId: writeUp.dataValues.id,
      reviewerId: reviewer2.dataValues.id,
      rating: 4
    };
  });

  context('Test function that creates rating', () => {
    it('should create a new rating for valid parameters when there is no conflict', async () => {
      res = await rating.createRating(newRating);
      expect(res).to.be.an('object');
      expect(res.dataValues).to.be.an('object');
      expect(res.dataValues).to.haveOwnProperty('articleId').equal(newRating.articleId);
      expect(res.dataValues).to.haveOwnProperty('reviewerId').equal(newRating.reviewerId);
      expect(res.dataValues).to.haveOwnProperty('rating').equal(newRating.rating);
    });

    it('should update users rating for valid parameters when there is no conflict', async () => {
      newRating.rating = 3;
      res = await rating.createRating(newRating);
      expect(res).to.be.an('object');
      expect(res.dataValues).to.be.an('object');
      expect(res.dataValues).to.haveOwnProperty('articleId').equal(newRating.articleId);
      expect(res.dataValues).to.haveOwnProperty('reviewerId').equal(newRating.reviewerId);
      expect(res.dataValues).to.haveOwnProperty('rating').equal(newRating.rating);
    });
  });

  context('Test function that get user rating for a specific article', () => {
    it('should get user rating for valid parameters when there is no conflict', async () => {
      res = await rating.userRating(newRating.reviewerId, newRating.articleId);
      expect(res).to.be.an('object');
      expect(res.dataValues).to.be.an('object');
      expect(Object.keys(res.dataValues).length).to.equal(1);
      expect(res.dataValues).to.haveOwnProperty('rating').equal(newRating.rating);
    });
  });

  context('Test function that gets average rating and reviewers count', () => {
    it('should get average rating eviewers count for a specific article if no errors', async () => {
      await rating.createRating(newRating2);
      res = await rating.getRatingDetails(newRating.articleId);
      expect(res).to.be.an('array');
      expect(res[0]).to.be.an('object');
      expect(res[0].dataValues).to.be.an('object');
      expect(Object.keys(res[0].dataValues).length).to.equal(2);
      expect(res[0].dataValues).to.haveOwnProperty('averageRating');
      expect(res[0].dataValues).to.haveOwnProperty('numberOfReviews').equal('2');
    });
  });
});
