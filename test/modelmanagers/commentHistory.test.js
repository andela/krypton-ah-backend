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
      comment: mockData.shortComment1
    };

    newComment2 = {
      articleId: writeUp.dataValues.id,
      userId: user2.dataValues.id,
      comment: mockData.shortComment2
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

  it('should get specific comment history', async () => {
    const { userId, articleId, comment } = newComment2;
    const historyDetails = await commentHistory.getModifiedComments('mainCommentId', newCommentId);

    expect(historyDetails).to.be.an('array');
    expect(historyDetails[0]).to.be.an('object');
    expect(historyDetails[0]).to.haveOwnProperty('dataValues').be.an('object');
    expect(historyDetails[0].dataValues).to.haveOwnProperty('id');
    expect(historyDetails[0].dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('comment').equal(comment);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('userId').equal(userId);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('updated').equal(false);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('deleted').equal(true);
    expect(historyDetails[0].dataValues).to.haveOwnProperty('createdAt');
    expect(historyDetails[0].dataValues).to.haveOwnProperty('updatedAt');
  });
});
