const chaiHttp = require('chai-http');
const chai = require('chai');
const { expect } = require('chai');
const sendVerficationMail = require('../../lib/utils/sendNotifications');
const user = require('../../database/models').User;
const article = require('../../lib/modelManagers/articlemodel');
const follow = require('../../lib/modelManagers/followModel');
const reaction = require('../../lib/modelManagers/articlesReactionModel');
const constants = require('../mockData');
const { userprofile } = require('../../database/models');
const commentModelManager = require('../../lib/modelManagers/articlesComment'),
  { comment1, comment2 } = require('../mockData');

chai.use(chaiHttp);
let thread;
let res;
let userid;
let testArticle;
let followerId,
  followeeId;
describe('Send email to users', () => {
  after('Delete Articles', async () => {
    user.destroy({
      where: {}
    });
  });
  before(async () => {
    user.destroy({
      where: {}
    });
    res = await user.create(constants.userdata3);
    const user2 = await user.create(constants.userdata2);
    await follow.followUser(user2.dataValues.id, res.dataValues.id);
    await userprofile.create(constants.userprofile3);
    await userprofile.create(constants.userprofile2);
    userid = res.dataValues.id;
    testArticle = constants.article(userid);
    const articleDetails = await article.createArticle(testArticle);
    comment1.userId = userid;
    comment1.articleId = articleDetails.dataValues.id;
    await reaction.createReaction(comment1.articleId, comment1.userId, 'like');
    const commentDetails = await commentModelManager.createComment({
      comment: comment1.comment,
      userId: comment1.userId,
      articleId: comment1.articleId
    });
    thread = await commentModelManager.createComment({
      comment: comment1.comment,
      userId: comment1.userId,
      articleId: comment1.articleId,
      mainCommentId: commentDetails.id
    });

    followerId = userid;
    followeeId = user2.dataValues.id;
    await follow.followUser(user2.dataValues.id, userid);
  });
  it('should send emails to users', async () => {
    const result = await sendVerficationMail.sendArticleNotificationToAuthorFollowers(
      testArticle.authorId,
      testArticle.title
    );
    expect(result).to.be.an('object');
  });


  it('should create comment', async () => {
    const req = {
      body: {
        comment: comment2.comment,
      },
      params: {
        articleId: comment1.articleId
      },
      decodedToken: {
        payLoad: userid
      }
    };
    const result = await sendVerficationMail.sendCommentNotificationToAuthor(
      req.params.articleId,
      req.body.comment,
      userid
    );
    expect(result).to.be.an('object');
  });

  it('should create comment', async () => {
    const req = {
      body: {
        comment: comment2.comment,
      },
      params: {
        articleId: comment1.articleId
      },
      decodedToken: {
        payLoad: userid
      }
    };
    const result = await sendVerficationMail.sendCommentNotificationToArticlefFollower(
      req.params.articleId,
      req.body.comment,
      userid
    );
    expect(result).to.be.an('array');
  });

  it('should create comment', async () => {
    const req = {
      body: {
        comment: comment2.comment,
      },
      params: {
        articleId: comment1.articleId
      },
      decodedToken: {
        payLoad: userid
      }
    };
    const result = await sendVerficationMail.sendThreadNotificationToUser(
      req.params.articleId,
      req.body.comment,
      thread.id,
      userid,
      comment1.articleId
    );
    expect(result).to.be.an('object');
  });

  it('should create comment', async () => {
    const result = await sendVerficationMail.sendNotificationToFollowedUser(
      followeeId,
      followerId
    );
    expect(result).to.be.an('function');
  });
});
