const users = require('../../lib/modelManagers/followModel');
const articleModelManager = require('../../lib/modelManagers/articlemodel');
const user = require('../../lib/modelManagers/userProfileModel');
const ArticleNotificationTemplate = require('./emailService/followedauthornotificationTemplate');
const constants = require('../../constants');
const mail = require('./emailService/mailler');

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


module.exports = {
  sendArticleNotificationToAuthorFollowers
};
