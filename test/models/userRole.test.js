const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const UserRoles = require('../../database/models/userRole');

describe('Test UserRoles Model', () => {
  const userRoles = UserRoles(sequelize, dataTypes);
  const userRole = new userRoles();

  context('Check if the userRole model exists', () => {
    it('should have valid model name (UserRoles) ', () => {
      expect(userRoles.modelName).to.equal('UserRoles');
    });
  });

  context('Check the properties of the userRole model', () => {
    it('should have the property "id"', () => {
      expect(userRole).to.have.property('id');
    });
    it('should have the property "roleId"', () => {
      expect(userRole).to.have.property('roleId');
    });
    it('should have the property "userId"', () => {
      expect(userRole).to.have.property('userId');
    });
  });
});
