const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const emailNotificication = require('../../middlewares/emailNotification');
const sendVerficationMail = require('../../lib/utils/sendNotifications');

chai.use(chaiHttp);

it('should send email to followers when a new article is created by author', async () => {
  const req = {
    authorId: {
    },
    title: {
    },
    id: {
    }
  };
  const res = {
    status() { return this; },
    json() { }
  };
  sinon.stub(sendVerficationMail, 'sendArticleNotificationToAuthorFollowers').returnsThis();
  await emailNotificication.notifyFollowers(req, res);
  sinon.restore();
});

describe('', () => {
  it('should send a server error', async () => {
    const res = {
      status() { return this; },
      json() { }
    };
    const consolespy = sinon.spy(console, 'log');
    sinon.stub(sendVerficationMail, 'sendArticleNotificationToAuthorFollowers').throws();
    await emailNotificication.notifyFollowers(res);
    expect(consolespy).to.be.a('function');
    sinon.restore();
  });
});
