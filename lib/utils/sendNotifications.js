const users = require('../../lib/modelManagers/followModel');
const articleModelManager = require('../../lib/modelManagers/articlemodel');
const user = require('../../lib/modelManagers/userProfileModel');
const User = require('../../lib/modelManagers/usermodel');
const articles = require('../../lib/modelManagers/articlemodel');
const articlesComment = require('../../lib/modelManagers/articlesComment');
const ArticleNotificationTemplate = require('./emailService/followedauthornotificationTemplate');
const constants = require('../../constants');
const mail = require('./emailService/mailler');
const followingNotificationTemplate = require('./emailService/followerNotificationtemplate');
const commentNotificationTemplate = require('./emailService/commentNotification');
const threadCommentNotification = require('./emailService/threadNotification');
const getTotalReactions = require('../modelManagers/articlesReactionModel');

const baseUrl = process.env.APP_BASE_URL;
const hostUrl = `${baseUrl}/`;

const sendArticleNotificationToAuthorFollowers = async (id, title) => {
  const UsersToNotify = await users.getUserFollowees(id);
  const author = await articleModelManager.getArticlesby('authorId', id);
  const authorName = `${author[0].articleAuthor.firstname} ${author[0].articleAuthor.lastname}`;
  UsersToNotify.rows.forEach(async (element) => {
    const eachUserToNotify = await user.getUserDetails('UserId', element.following.id);
    if (eachUserToNotify.emailnotification === true) {
      const html = {
        hostUrl,
        recipient: `${element.following.firstname} ${element.following.lastname}`,
        author: authorName,
        title
      };
      mail(
        element.following.email,
        constants.NEW_ARTICLE_SUBJECT,
        ArticleNotificationTemplate(hostUrl, html.recipient, html.author, html.title)
      );
    }
  });
  return UsersToNotify;
};


const sendNotificationToFollowedUser = async (id, followeeId) => {
  const UserToNotify = await User.getUser(id);
  const followerDetails = await User.getUser(followeeId);
  if (UserToNotify.userprofile.emailnotification === true) {
    const html = {
      email: UserToNotify.email,
      recipient: `${UserToNotify.firstname} ${UserToNotify.lastname}`,
      follower: `${followerDetails.firstname} ${followerDetails.lastname}`,
    };
    mail(
      html.email,
      constants.NEW_FOLLOWER_SUBJECT,
      followingNotificationTemplate(hostUrl, html.recipient, html.follower)
    );
  }

  return sendNotificationToFollowedUser;
};

const sendCommentNotificationToAuthor = async (id, comment, userId) => {
  const userDetails = await User.getUser(userId);
  const articleCommented = await articles.getArticlesby('id', id);
  const AuthorDetails = await User.getUser(articleCommented[0].authorId);
  if (AuthorDetails.userprofile.emailnotification === true) {
    const html = {
      email: AuthorDetails.email,
      recipient: `${AuthorDetails.firstname}`,
      commenter: `${userDetails.firstname} ${userDetails.lastname}`,
      comment,
      article: articleCommented[0].title
    };
    mail(
      html.email,
      constants.AUTHOR_COMMENT_SUBJECT,
      commentNotificationTemplate(
        hostUrl,
        html.commenter,
        html.recipient,
        html.article,
        html.comment
      )
    );
  }
  return AuthorDetails;
};

const sendCommentNotificationToArticlefFollower = async (id, comment, userId) => {
  const Commenter = await User.getUser(userId);
  const where = {
    articleId: id,
    reaction: 'like'
  };
  const allReactions = await getTotalReactions.getUsersThatLiked(where);
  allReactions.forEach(async (UsersToNotify) => {
    const userDetails = await User.getUser(UsersToNotify.userId);
    const articleCommented = await articles.getArticlesby('id', id);
    if (userDetails.userprofile.emailnotification === true) {
      const html = {
        email: userDetails.email,
        recipient: `${userDetails.firstname}`,
        commenter: `${Commenter.firstname} ${Commenter.lastname}`,
        comment,
        article: articleCommented[0].title
      };
      mail(
        html.email,
        constants.ARTICLE_SUBJECT,
        commentNotificationTemplate(
          hostUrl,
          html.commenter,
          html.recipient,
          html.article,
          html.comment,
          'user'
        )
      );
    }
  });
  return allReactions;
};

const sendThreadNotificationToUser = async (id, comment, mainCommentId, userId, article) => {
  const threadCommentUser = await User.getUser(userId);
  const articleCommented = await articlesComment.findCommentThreads(article, mainCommentId);
  const MainCommentUser = await User.getUser(articleCommented.userId);
  const articleDetails = await articles.getArticlesby('id', id);
  if (MainCommentUser.userprofile.emailnotification === true) {
    const html = {
      email: MainCommentUser.email,
      recipient: `${MainCommentUser.firstname}`,
      commenter: `${threadCommentUser.firstname} ${threadCommentUser.lastname}`,
      comment,
      article: articleDetails[0].title,
      mainComment: articleCommented.comment
    };
    mail(
      html.email,
      constants.THREAD_SUBJECT,
      threadCommentNotification(
        hostUrl,
        html.commenter,
        html.recipient,
        html.article,
        html.comment.mainComment
      )
    );
  }
  return threadCommentUser;
};

module.exports = {
  sendArticleNotificationToAuthorFollowers,
  sendNotificationToFollowedUser,
  sendCommentNotificationToAuthor,
  sendThreadNotificationToUser,
  sendCommentNotificationToArticlefFollower
};
