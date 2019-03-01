const { expect } = require('chai');
const sinon = require('sinon');
const userProfileController = require('../../controllers/userProfileController');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const UserProfileModelManager = require('../../lib/modelManagers/userProfileModel');
const { userProfileMock, userMock, updatedUserProfileMock } = require('../../constants');
const {
  SERVER_ERROR_CODE,
  OK_CODE,
  RESOURCE_CREATED_CODE,
  CREATE_USER_PROFILE_SUCCESS_MESSAGE,
  UPDATE_USER_PROFILE_SUCCESS_MESSAGE,
  UPDATE_USER_PROFILE_ERROR_MESSAGE,
  CREATE_USER_PROFILE_ERROR_MESSAGE
} = require('../../constants');

describe('User profile controller', () => {
  const dataStore = {};
  afterEach('Drop user', async () => {
    if (dataStore.newUser) {
      await UserModelManager.delete(dataStore.newUser.id);
    }
    if (dataStore.newUser2) {
      await UserModelManager.delete(dataStore.newUser2.id);
    }
  });
  describe('Create user profile', async () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
    });
    it('should successfully create user profile', async () => {
      const req = {
        decodedToken: {
          payLoad: {
            id: dataStore.newUser.id
          }
        },
        body: {
          ...userProfileMock
        }
      };
      const res = {
        status: () => {},
        json: () => {}
      };
      const statusStub = sinon.stub(res, 'status').returnsThis();
      const jsonStub = sinon.stub(res, 'json').returnsThis();
      await userProfileController.createUserProfileController(req, res);
      const {
        UserId, createdAt, id, updatedAt, ...data
      } = jsonStub.firstCall.args[0].data;
      expect(statusStub.calledOnceWithExactly(RESOURCE_CREATED_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(true);
      expect(jsonStub.firstCall.args[0].message).to.equal(CREATE_USER_PROFILE_SUCCESS_MESSAGE);
      expect(data).to.eql(userProfileMock);
      expect(UserId).to.be.a('string');
      expect(createdAt).to.be.a('date');
      expect(updatedAt).to.be.a('date');
      expect(id).to.be.a('number');
    });
  });
  describe('Update user profile', async () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
      userProfileMock.userId = dataStore.newUser.id;
      await UserProfileModelManager.createUserProfile(userProfileMock);
    });
    it('should successfully update user profile', async () => {
      const req = {
        decodedToken: {
          payLoad: {
            id: dataStore.newUser.id
          }
        },
        body: {
          ...updatedUserProfileMock
        }
      };
      const res = {
        status: () => {},
        json: () => {}
      };
      const statusStub = sinon.stub(res, 'status').returnsThis();
      const jsonStub = sinon.stub(res, 'json').returnsThis();
      await userProfileController.updateUserProfileController(req, res);
      const {
        UserId, createdAt, id, updatedAt, ...data
      } = jsonStub.firstCall.args[0].data;
      expect(statusStub.calledOnceWithExactly(OK_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(true);
      expect(jsonStub.firstCall.args[0].message).to.equal(UPDATE_USER_PROFILE_SUCCESS_MESSAGE);
      expect(data).to.eql(updatedUserProfileMock);
      expect(UserId).to.be.a('string');
      expect(createdAt).to.be.a('date');
      expect(updatedAt).to.be.a('date');
      expect(id).to.be.a('number');
    });
  });
  describe('Create user profile error', async () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
      userProfileMock.userId = dataStore.newUser.id;
      await UserProfileModelManager.createUserProfile(userProfileMock);
      dataStore.newUser2 = await UserModelManager.create(
        'user2@mail.com',
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
    });
    it('should fail to create user profile', async () => {
      const req = {
        decodedToken: {
          payLoad: { id: dataStore.newUser2.id }
        },
        body: {
          ...userProfileMock
        }
      };
      const res = {
        status: () => {},
        json: () => {}
      };
      const statusStub = sinon.stub(res, 'status').returnsThis();
      const jsonStub = sinon.stub(res, 'json').returnsThis();
      await userProfileController.createUserProfileController(req, res);
      expect(statusStub.calledOnceWithExactly(SERVER_ERROR_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(false);
      expect(jsonStub.firstCall.args[0].message).to.equal(CREATE_USER_PROFILE_ERROR_MESSAGE);
    });
  });
  describe('Update user profile error', async () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
      userProfileMock.userId = dataStore.newUser.id;
      await UserProfileModelManager.createUserProfile(userProfileMock);
      dataStore.newUser2 = await UserModelManager.create(
        'user2@mail.com',
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
      userProfileMock.userId = dataStore.newUser2.id;
      await UserProfileModelManager.createUserProfile({ ...userProfileMock, username: 'user2' });
    });
    it('should fail to update user profile', async () => {
      const req = {
        decodedToken: {
          payLoad: { id: dataStore.newUser2.id }
        },
        body: {
          ...userProfileMock
        }
      };
      const res = {
        status: () => {},
        json: () => {}
      };
      const statusStub = sinon.stub(res, 'status').returnsThis();
      const jsonStub = sinon.stub(res, 'json').returnsThis();
      await userProfileController.updateUserProfileController(req, res);
      expect(statusStub.calledOnceWithExactly(SERVER_ERROR_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(false);
      expect(jsonStub.firstCall.args[0].message).to.equal(UPDATE_USER_PROFILE_ERROR_MESSAGE);
    });
  });
});
