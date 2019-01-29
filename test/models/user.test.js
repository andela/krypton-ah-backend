const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const profile = require('../../database/models/userprofile');
const User = require('../../database/models/user');
const ArticlesReactions = require('../../database/models/articlesReaction');

describe('User Model', () => {
  const users = User(sequelize, dataTypes);
  const user = new users();

  context('Check if the User model exists', () => {
    it('should have model valid model name (User) ', () => {
      expect(users.modelName).to.equal('User');
    });
  });

  context('Check the properties of the User Model', () => {
    it('The User model should have the property "email"', () => {
      expect(user).to.have.property('email');
    });

    it('The User model should have the property "password"', () => {
      expect(user).to.have.property('password');
    });

    it('The User model should have the property "isverified"', () => {
      expect(user).to.have.property('isverified');
    });

    context('Check the User Model associations', () => {
      before(() => {
        users.associate({
          profile
        });
        users.associate({
          ArticlesReactions
        });
      });

      it('should have a one-to-one association with the profile Model', () => {});
      it('should have a hasMany association with ArticleReaction model', () => {
        expect(users.hasMany.calledWith(ArticlesReactions)).to.equal(true);
      });
    });
  });
});
