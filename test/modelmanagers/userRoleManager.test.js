const { expect } = require('chai');
// const sinon = require('sinon');
const { role } = require('../mockData');
const { createAdminRole } = require('../../lib/modelManagers/userRoleManager');
const { Roles } = require('../../database/models');
const { options } = require('../testHelper');

let createdRole = {};
describe('role manager', () => {
  beforeEach(async () => {
    createdRole = await createAdminRole(role);
  });
  after('after delete record', async () => {
    Roles.destroy(options);
  });
  it('should confirm that the created role is equal to admin', async () => {
    expect(createdRole.dataValues.role).to.equal('admin');
  });
});
