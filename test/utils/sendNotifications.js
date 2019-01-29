const chaiHttp = require('chai-http');
const chai = require('chai');
<<<<<<< HEAD

=======
>>>>>>> send notification to user following author
const { expect } = require('chai');
const sendVerficationMail = require('../../lib/utils/sendNotifications');
const user = require('../../database/models').User;
const article = require('../../lib/modelManagers/articlemodel');
const constants = require('../mockData');
const { userprofile } = require('../../database/models');
const follow = require('../../lib/modelManagers/followModel');

chai.use(chaiHttp);

let res;
let userid;
let testArticle;
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
    await article.createArticle(testArticle);
  });
  it('should send emails to users', async () => {
    const result = await sendVerficationMail.sendArticleNotificationToAuthorFollowers(
      testArticle.authorId,
      testArticle.title
    );
    expect(result).to.be.an('object');
  });
});
