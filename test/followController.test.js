const faker = require('faker'),
  chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { userdata, userdata2 } = require('../test/mockData'),
  User = require('../lib/modelManagers/usermodel'),
  {
    follow,
    unfollow,
    followers,
    following
  } = require('../controllers/FollowController'),
  {
    NOW_FOLLOWING_USER,
    RESOURCE_CREATED_CODE,
    NOT_FOUND_CODE_MESSAGE,
    NOT_FOUND_CODE,
    FOLLOW_SELF,
    MY_FOLLOWEES,
    MY_FOLLOWERS,
    BAD_REQUEST_CODE,
    UNFOLLOW_USER_MESSAGE,
    ALREADY_FOLLOWING_AUTHOR,
    OK_CODE,
    NO_FOLLOWER,
    SERVER_ERROR_MESSAGE,
    SERVER_ERROR_CODE
  } = require('../constants/index');

const { expect } = chai;
chai.use(sinonChai);

let followerId = '',
  followeeId = '',
  req, res;

describe('User follow and Unfollow', () => {
  const mockFollower = {
    email: faker.internet.email(),
    password: userdata.password,
    firstname: userdata.firstname,
    lastname: userdata.lastname
  };

  const mockFollowee = {
    email: faker.internet.email(),
    password: userdata2.password,
    firstname: userdata2.firstname,
    lastname: userdata2.lastname
  };
  before(async () => {
    const follower = await User.create(
      mockFollower.email,
      mockFollower.password,
      mockFollower.firstname,
      mockFollower.lastname
    );

    const followee = await User.create(
      mockFollowee.email,
      mockFollowee.password,
      mockFollowee.firstname,
      mockFollowee.lastname
    );
    followerId = follower.dataValues.id;
    followeeId = followee.dataValues.id;
  });
  it('should return an error message if user doesn\'t exist "followers" ', async () => {
    req = {
      query: {
        id: 'qwertyui34567'
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await followers(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
  it('should return an error message if user doesn\'t exist "following" ', async () => {
    req = {
      query: {
        id: '1576a842-7ceb-4848-9a9c-2c925ba959d1'
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await following(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOT_FOUND_CODE_MESSAGE);
  });
  it('should return an error message if user doesn\'t exist "followers" ', async () => {
    req = {
      query: {
        id: '1576a842-7ceb-4848-9a9c-2c925ba959d1'
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await followers(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOT_FOUND_CODE_MESSAGE);
  });
  it('should return an error message if user passed an invalid id format "followees" ', async () => {
    req = {
      query: {
        id: 'qwertyui34567'
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await following(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
  it('should return an error message if user passed an invalid id format "follow" ', async () => {
    req = {
      query: {
        id: 'qwertyui34567'
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await follow(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
  it('should return an error message if user passed an invalid id format "followees" ', async () => {
    req = {
      query: {
        id: followerId
      },
      decodedToken: {
        payLoad: '1576a842-7ceb-4848-9a9c-2c925ba959d1'
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await unfollow(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });
  it('should return an error message if user doesn\'t exist "unfollow" ', async () => {
    req = {
      params: {
        id: followerId
      },
      decodedToken: {
        payLoad: '1576a842-7ceb-4848-9a9c-2c925ba959d1'
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await unfollow(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOT_FOUND_CODE_MESSAGE);
  });
  it('should return success message, if not following any user', async () => {
    req = {
      query: {
        id: followerId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await following(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NO_FOLLOWER);
  });
  it('should return success message, if user has no follower', async () => {
    req = {
      query: {
        id: followerId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await followers(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
  });
  it('should return success message and follow a user', async () => {
    req = {
      params: {
        id: followerId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await follow(req, res);
    expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOW_FOLLOWING_USER);
  });
  it('should return an error if user is already been followed', async () => {
    before(async () => {
      req = {
        params: {
          id: followerId
        },
        decodedToken: {
          payLoad: followeeId
        }
      };
      res = {
        status() { return this; },
        json() { }
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      await follow(req, res);
      expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
      expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOW_FOLLOWING_USER);
    });
    req = {
      params: {
        id: followerId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await follow(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(ALREADY_FOLLOWING_AUTHOR);
  });
  it('should return an error message if user doesn\'t exist "follow"', async () => {
    req = {
      params: {
        id: '1576a842-7ceb-4848-9a9c-2c925ba959d1'
      },
      decodedToken: {
        payLoad: null
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await follow(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NOT_FOUND_CODE_MESSAGE);
  });
  it('should return an error if user try to follow himself', async () => {
    req = {
      params: {
        id: followeeId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await follow(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(FOLLOW_SELF);
  });
  it('should return success and get user following', async () => {
    req = {
      query: {
        id: followerId
      },
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await following(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(MY_FOLLOWERS);
  });
  it('should return success and get user followers', async () => {
    req = {
      query: {
        id: followeeId
      },
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await followers(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(MY_FOLLOWEES);
  });
  it('should return success message and unfollow a user', async () => {
    req = {
      params: {
        id: followerId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await unfollow(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(UNFOLLOW_USER_MESSAGE);
  });
  it('should return an error, when user try to unfollow himself', async () => {
    req = {
      params: {
        id: followeeId
      },
      decodedToken: {
        payLoad: followeeId
      }
    };

    res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await unfollow(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(FOLLOW_SELF);
  });
});
