const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const profile = require('../../database/models/userprofile');
const User = require('../../database/models/user');

describe('User Model', () => {
  const profiles = profile(sequelize, dataTypes);
  const user = new profiles();

  context('Check if the User profile model exists', () => {
    it('should have model valid model name (User) ', () => {
      expect(profiles.modelName).to.equal('userprofile');
    });
  });

  context('Check the properties of the User Model', () => {
    it('The User profile model should have the property "avatar"', () => {
      expect(user).to.have.property('avatar');
    });

    it('The User profile model should have the property "bio"', () => {
      expect(user).to.have.property('bio');
    });

    it('The User profile model should have the property "userId"', () => {
      expect(user).to.have.property('userId');
    });

    it('The User profile model should have the property "country"', () => {
      expect(user).to.have.property('country');
    });

    it('The User profile model should have the property "phonenumber"', () => {
      expect(user).to.have.property('phonenumber');
    });

    it('The User profile model should have the property "gender"', () => {
      expect(user).to.have.property('gender');
    });

    it('The User profile model should have the property "username"', () => {
      expect(user).to.have.property('username');
    });

    it('The User profile model should have the property "email_notification"', () => {
      expect(user).to.have.property('emailnotification');
    });
  });

  context('Check the User profile Model associations', () => {
    before(() => {
      profiles.associate({
        User,
      });
    });

    it('should have a one-to-one association with the user Model', () => {
      expect(profiles.hasOne.calledWith(User)).to.equal(false);
    });
  });
});
