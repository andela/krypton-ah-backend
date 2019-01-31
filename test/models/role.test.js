const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const Roles = require('../../database/models/role');
const User = require('../../database/models/user');

describe('Test Role Model', () => {
  const roles = Roles(sequelize, dataTypes);
  const role = new roles();

  context('Check if the role model exists', () => {
    it('should have valid model name (Roles) ', () => {
      expect(roles.modelName).to.equal('Roles');
    });
  });

  context('Check the properties of the role model', () => {
    it('should have the property "role"', () => {
      expect(role).to.have.property('role');
    });
  });

  context('Check the role Model associations', () => {
    before(() => {
      roles.associate({
        User
      });
    });

    it('should have a belongsToMany association with userModel', () => {
      expect(roles.belongsToMany.calledWith(User)).to.equal(true);
    });
  });
});
