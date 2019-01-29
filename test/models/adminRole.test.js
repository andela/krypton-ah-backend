const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');

const { expect } = require('chai');

const UserModel = require('../../database/models/user');
const AdminRoleModel = require('../../database/models/adminRole');

describe('AdminRole Model Test', () => {
  const AdminRoles = AdminRoleModel(sequelize, dataTypes);
  const Users = UserModel(sequelize, dataTypes);
  const adminRoles = new AdminRoles();

  checkModelName(AdminRoles)('AdminRoles');

  context('AdminRoles properties Test', () => {
    ['id', 'role'].forEach(checkPropertyExists(adminRoles));
  });

  context('Admin Roles associations Test', () => {
    before(() => {
      AdminRoles.associate(Users);
    });
    it('AdminRole should have many Users', () => {
      expect(AdminRoles.hasMany).to.have.been.calledWith(Users);
    });
  });
});
