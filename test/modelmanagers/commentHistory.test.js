const { expect } = require('chai');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const articles = require('../../lib/modelManagers/articlemodel');
const articleComment = require('../../lib/modelManagers/articlesComment');
const commentHistory = require('../../lib/modelManagers/commentsHistoryModel');
const mockData = require('../mockData');

let newComment = {};
let newComment2 = {};
let newCommentId;

describe('Unit test for comment history model manager', () => {
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
    mockData.destroyData();
  });

  before(async () => {
    const user1 = await UserModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const user2 = await UserModelManager.create(
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
      comment: 'We are happy!'
    };

    newComment2 = {
      articleId: writeUp.dataValues.id,
      userId: user2.dataValues.id,
      comment: 'How are you feeling?'
    };

    const newCommentDetails = await articleComment.createComment({
      comment: newComment.comment,
      userId: newComment.userId,
      articleId: newComment.articleId,
      updated: true
    });

    newCommentId = newCommentDetails.dataValues.id;

    await articleComment.createComment({
      comment: newComment2.comment,
      userId: newComment2.userId,
      articleId: newComment2.articleId,
      mainCommentId: newCommentId,
      deleted: true
    });
  });

  context('Test to get all comment history', () => {
    it('should get all comment history', async () => {
      const { userId, articleId, comment } = newComment2;
      const historyDetails = await commentHistory.getAllHistory();

      expect(historyDetails).to.be.an('object');
      expect(historyDetails).to.haveOwnProperty('count').equal(2);
      expect(historyDetails).to.haveOwnProperty('rows').be.an('array').length(2);
      expect(historyDetails.rows[0]).to.haveOwnProperty('dataValues').be.an('object');
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('id');
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('updated').equal(false);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('deleted').equal(true);
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('createdAt');
      expect(historyDetails.rows[0].dataValues).to.haveOwnProperty('updatedAt');

      expect(historyDetails.rows[1]).to.haveOwnProperty('dataValues').be.an('object');
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('id');
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('mainCommentId').equal(null);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('comment').equal(newComment.comment);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('articleId').equal(newComment.articleId);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('userId').equal(newComment.userId);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('updated').equal(true);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('createdAt');
      expect(historyDetails.rows[1].dataValues).to.haveOwnProperty('updatedAt');
    });

    it('should get specific comment history', async () => {
      const { userId, articleId, comment } = newComment2;
      const historyDetails = await commentHistory.getHistory('mainCommentId', newCommentId);

      expect(historyDetails).to.be.an('object');
      expect(historyDetails).to.haveOwnProperty('dataValues').be.an('object');
      expect(historyDetails.dataValues).to.haveOwnProperty('id');
      expect(historyDetails.dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
      expect(historyDetails.dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(historyDetails.dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(historyDetails.dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(historyDetails.dataValues).to.haveOwnProperty('updated').equal(false);
      expect(historyDetails.dataValues).to.haveOwnProperty('deleted').equal(true);
      expect(historyDetails.dataValues).to.haveOwnProperty('createdAt');
      expect(historyDetails.dataValues).to.haveOwnProperty('updatedAt');
    });
  });
});
