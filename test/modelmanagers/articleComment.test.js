const { expect } = require('chai');
const faker = require('faker');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const articles = require('../../lib/modelManagers/articlemodel');
const articleComment = require('../../lib/modelManagers/articlesComment');
const mockData = require('../mockData');

let newComment = {};
let newComment2 = {};
let newCommentId;
const fakeUuid = faker.random.uuid();

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

    await articleComment.createComment({
      comment: newComment2.comment,
      userId: newComment2.userId,
      articleId: newComment2.articleId
    });
  });

  context('Test for creating comments', () => {
    it('should create new comment', async () => {
      const { userId, articleId, comment } = newComment;
      const newCommentDetails = await articleComment.createComment({
        comment,
        userId,
        articleId
      });
      expect(newCommentDetails).to.be.an('object');
      expect(newCommentDetails).to.haveOwnProperty('dataValues').be.an('object');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('id');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('mainCommentId').equal(null);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('updated').equal(false);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('createdAt');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('updatedAt');
      newCommentId = newCommentDetails.dataValues.id;
    });

    it('should create new thread in a comment', async () => {
      const { userId, articleId, comment } = newComment;
      const newCommentDetails = await articleComment.createComment({
        comment,
        userId,
        articleId,
        mainCommentId: newCommentId
      });
      expect(newCommentDetails).to.be.an('object');
      expect(newCommentDetails).to.haveOwnProperty('dataValues').be.an('object');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('id');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('updated').equal(false);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(newCommentDetails.dataValues).to.haveOwnProperty('createdAt');
      expect(newCommentDetails.dataValues).to.haveOwnProperty('updatedAt');
    });
  });

  context('Test for getting comments', () => {
    it('should get all comments in an article', async () => {
      const { userId, articleId, comment } = newComment;
      const commentDetails = await articleComment.findAllComment(articleId);
      expect(commentDetails).to.be.an('array').length(2);
      expect(commentDetails[1]).to.haveOwnProperty('dataValues').be.an('object');
      expect(commentDetails[1].dataValues).to.haveOwnProperty('id');
      expect(commentDetails[1].dataValues).to.haveOwnProperty('mainCommentId').equal(null);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('updated').equal(false);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(commentDetails[1].dataValues).to.haveOwnProperty('createdAt');
      expect(commentDetails[1].dataValues).to.haveOwnProperty('updatedAt');
      expect(commentDetails[1].dataValues).to.haveOwnProperty('threads').be.an('array').length(1);
    });

    it('should get all threads in a comment', async () => {
      const { userId, articleId, comment } = newComment;
      const threadDetails = await articleComment.findCommentThreads(articleId, newCommentId);
      expect(threadDetails).to.be.an('object');
      expect(threadDetails).to.haveOwnProperty('dataValues').be.an('object');
      expect(threadDetails.dataValues).to.haveOwnProperty('id').equal(newCommentId);
      expect(threadDetails.dataValues).to.haveOwnProperty('threads').be.an('array').length(1);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('id');
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('updated').equal(false);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('createdAt');
      expect(threadDetails.dataValues.threads[0].dataValues).to.haveOwnProperty('updatedAt');
    });

    it('should get a specific comment in an article', async () => {
      const { userId, articleId, comment } = newComment;
      const commentDetails = await articleComment.findComment(articleId, newCommentId);
      expect(commentDetails).to.be.an('object');
      expect(commentDetails).to.haveOwnProperty('dataValues').be.an('object');
      expect(commentDetails.dataValues).to.haveOwnProperty('id').equal(newCommentId);
      expect(commentDetails.dataValues).to.haveOwnProperty('mainCommentId').equal(null);
      expect(commentDetails.dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(commentDetails.dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(commentDetails.dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(commentDetails.dataValues).to.haveOwnProperty('updated').equal(false);
      expect(commentDetails.dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(commentDetails.dataValues).to.haveOwnProperty('createdAt');
      expect(commentDetails.dataValues).to.haveOwnProperty('updatedAt');
    });
  });

  context('Test to update a comment', () => {
    it('should update an existing comment', async () => {
      const { userId, articleId } = newComment,
        comment = 'Please I am tired';
      const updatedCommentDetails = await articleComment.updateArticleComment(
        { comment },
        newCommentId
      );
      expect(updatedCommentDetails).to.be.an('array').length(2);
      expect(updatedCommentDetails[0]).to.equal(1);
      expect(updatedCommentDetails[1]).to.be.an('array');
      expect(updatedCommentDetails[1][0]).to.haveOwnProperty('dataValues').be.an('object');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('id');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('mainCommentId').equal(null);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('updated').equal(false);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('createdAt');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('updatedAt');
    });

    it('should update an existing comment thread', async () => {
      const { userId, articleId } = newComment,
        comment = 'Please I am tired';
      const updatedCommentDetails = await articleComment.updateAllCommentThreads(
        { comment },
        newCommentId
      );
      expect(updatedCommentDetails).to.be.an('array').length(2);
      expect(updatedCommentDetails[0]).to.equal(1);
      expect(updatedCommentDetails[1]).to.be.an('array');
      expect(updatedCommentDetails[1][0]).to.haveOwnProperty('dataValues').be.an('object');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('id');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('mainCommentId').equal(newCommentId);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('comment').equal(comment);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('articleId').equal(articleId);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('userId').equal(userId);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('updated').equal(false);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('deleted').equal(false);
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('createdAt');
      expect(updatedCommentDetails[1][0].dataValues).to.haveOwnProperty('updatedAt');
    });

    it('should not update an existing comment', async () => {
      const comment = '';
      const updatedCommentDetails = await articleComment.updateArticleComment(
        { comment },
        fakeUuid
      );
      expect(updatedCommentDetails).to.be.an('array').length(2);
      expect(updatedCommentDetails[0]).to.equal(0);
      expect(updatedCommentDetails[1]).to.be.an('array').length(0);
    });

    it('should not update an existing comment thread', async () => {
      const comment = '';
      const updatedCommentDetails = await articleComment.updateAllCommentThreads(
        { comment },
        fakeUuid
      );
      expect(updatedCommentDetails).to.be.an('array').length(2);
      expect(updatedCommentDetails[0]).to.equal(0);
      expect(updatedCommentDetails[1]).to.be.an('array').length(0);
    });
  });
});
