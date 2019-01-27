const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Follow = require('../../database/models/follows');

describe('Test Follows Model', () => {
  const followsTem = Follow(sequelize, dataTypes);
  const follow = new followsTem();

  context('Check if the Follow model exists', () => {
    it('should have model valid model name (follows) ', () => {
      expect(followsTem.modelName).to.equal('follows');
    });
  });
  context('Check the properties of the Follows Model', () => {
    it('The Follows model should have the property "followerId"', () => {
      expect(follow).to.have.property('followerId');
    });
  });

  context('Check the properties of the Follows Model', () => {
    it('The Follows model should have the property "id"', () => {
      expect(follow).to.have.property('id');
    });
  });

  context('Check the properties of the Follows Model', () => {
    it('The follows model should have the property "followeeId"', () => {
      expect(follow).to.have.property('followeeId');
    });
  });
  context('Check the follow Model associations', () => {
    before(() => {
      followsTem.associate({
        User,
      });
    });

    it('should have a belongsTo association with UserModel', () => {
      expect(followsTem.belongsTo.calledWith(User)).to.equal(true);
    });
  });
});
