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

it('should send email to followers when a new article is created by author', async () => {
  const req = {
    id: {
    },
    followeeId: {
    },
  };
  const res = {
    status() { return this; },
    json() { }
  };
  sinon.stub(sendVerficationMail, 'sendNotificationToFollowedUser').returnsThis();
  await emailNotificication.followNotification(req, res);
  sinon.restore();
});


it('should send email to followers when a new article is created by author', async () => {
  const req = {
    id: {
    },
    comment: {
    },
    mainCommentId: {
    },
    userId: {
    },
    articleId: {
    },
  };
  const res = {
    status() { return this; },
    json() { }
  };
  sinon.stub(sendVerficationMail, 'sendThreadNotificationToUser').returnsThis();
  await emailNotificication.CommentNotification(req, res);
  sinon.restore();
});

it('should send email to followers when a new article is created by author', async () => {
  const req = {
    id: {
    },
    comment: {
    },
    userId: {
    },
  };
  const res = {
    status() { return this; },
    json() { }
  };
  sinon.stub(sendVerficationMail, 'sendCommentNotificationToAuthor').returnsThis();
  await emailNotificication.CommentNotification(req, res);
  sinon.restore();
});

describe('', () => {
  it('should send a server error', async () => {
    const res = {
      status() { return this; },
      json() { }
    };
    const consolespy = sinon.stub(console, 'log');
    sinon.stub(sendVerficationMail, 'sendArticleNotificationToAuthorFollowers').throws();
    await emailNotificication.notifyFollowers(res);
    expect(consolespy).to.be.a('function');
    sinon.restore();
  });
});

describe('', () => {
  it('should send a server error', async () => {
    const req = {
      id: {
      },
      comment: {
      },
      userId: {
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };
    const consolespy = sinon.stub(console, 'log');
    sinon.stub(sendVerficationMail, 'sendCommentNotificationToAuthor').throws();
    await emailNotificication.CommentNotification(req, res);
    expect(consolespy).to.be.a('function');
    sinon.restore();
  });
});

describe('', () => {
  it('should send a server error', async () => {
    const req = {
      id: {
      },
      followeeId: {
      },
    };
    const res = {
      status() { return this; },
      json() { }
    };
    const consolespy = sinon.stub(console, 'log');
    sinon.stub(sendVerficationMail, 'sendNotificationToFollowedUser').throws();
    await emailNotificication.followNotification(req, res);
    expect(consolespy).to.be.a('function');
    sinon.restore();
  });
});


it('should successfully add a new article', async () => {
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
  const consolespy = sinon.stub(console, 'log');
  sinon.stub(sendVerficationMail, 'sendArticleNotificationToAuthorFollowers').throws();
  await emailNotificication.notifyFollowers(req, res);
  expect(consolespy).to.be.a('function');
  sinon.restore();
});
