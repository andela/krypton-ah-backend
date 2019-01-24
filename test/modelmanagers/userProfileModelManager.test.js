const { expect } = require('chai');
const UserProfileModelManager = require('../../lib/modelManagers/userProfileModel');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const { User, userprofile } = require('../../database/models');
const { userProfileMock, userMock, updatedUserProfileMock } = require('../../constants');

describe('User Profile Model Manager', async () => {
  const dataStore = {};
  afterEach('Delete User', async () => {
    User.destroy({
      where: {}
    });
  });
  describe('Create user profile', () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
    });
    it('should have new user profile created', async () => {
      userProfileMock.userId = dataStore.newUser.id;
      await UserProfileModelManager.createUserProfile(userProfileMock);
      dataStore.user = await User.findOne({
        where: { id: dataStore.newUser.id },
        include: [{ model: userprofile, as: 'userprofile' }]
      });
      const {
        avatar,
        userId,
        bio,
        username,
        country,
        phonenumber,
        gender,
        emailnotification
      } = userProfileMock;
      expect(dataStore.user.userprofile.avatar).to.equal(avatar);
      expect(dataStore.user.userprofile.UserId).to.equal(userId);
      expect(dataStore.user.userprofile.bio).to.equal(bio);
      expect(dataStore.user.userprofile.username).to.equal(username);
      expect(dataStore.user.userprofile.country).to.equal(country);
      expect(dataStore.user.userprofile.phonenumber).to.equal(phonenumber);
      expect(dataStore.user.userprofile.gender).to.equal(gender);
      expect(dataStore.user.userprofile.emailnotification).to.equal(emailnotification);
    });
  });
  describe('Update user profile', async () => {
    before(async () => {
      const newUser = await UserModelManager.create(
        userMock.email,
        userMock.password,
        userMock.firstname,
        userMock.lastname
      );
      dataStore.newUser = newUser;
      userProfileMock.userId = newUser.id;
      await UserProfileModelManager.createUserProfile(userProfileMock);
    });
    it("should update the user profile's details", async () => {
      await UserProfileModelManager.updateUserProfile(dataStore.newUser.id, updatedUserProfileMock);
      dataStore.user = await User.findOne({
        where: { id: dataStore.newUser.id },
        include: [{ model: userprofile, as: 'userprofile' }]
      });
      const {
        phonenumber,
        avatar,
        bio,
        username,
        country,
        gender,
        emailnotification
      } = updatedUserProfileMock;
      expect(dataStore.user.userprofile.phonenumber).to.equal(phonenumber);
      expect(dataStore.user.userprofile.avatar).to.equal(avatar);
      expect(dataStore.user.userprofile.bio).to.equal(bio);
      expect(dataStore.user.userprofile.username).to.equal(username);
      expect(dataStore.user.userprofile.country).to.equal(country);
      expect(dataStore.user.userprofile.gender).to.equal(gender);
      expect(dataStore.user.userprofile.emailnotification).to.equal(emailnotification);
    });
  });
  describe('Create user profile error', () => {
    let errMsg;
    before(async () => {
      try {
        errMsg = await UserProfileModelManager.createUserProfile({ userId: 'invalidUserId' });
      } catch (err) {
        errMsg = 'Error thrown';
      }
    });
    it('throws an error when trying to create a profile with invalid userId', async () => {
      expect(errMsg).to.equal('Error thrown');
    });
  });
  describe('Create user profile error', () => {
    let errMsg;
    before(async () => {
      try {
        errMsg = await UserProfileModelManager.createUserProfile({ userId: null });
      } catch (err) {
        errMsg = 'Error thrown';
      }
    });
    it('throws an error when trying to create a profile with null userId', async () => {
      expect(errMsg).to.equal('Error thrown');
    });
  });
  describe('Update user profile error', () => {
    let errMsg;
    before(async () => {
      try {
        errMsg = await UserProfileModelManager.updateUserProfile('invalidUserId', {});
      } catch (err) {
        errMsg = 'Error thrown';
      }
    });
    it('throws an error when trying to update a profile with invalid data', async () => {
      expect(errMsg).to.equal('Error thrown');
    });
  });
});
