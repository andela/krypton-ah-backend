const { expect } = require('chai');
const { role, newRole } = require('../mockData');
const { createRole, findRole, deleteRole } = require('../../lib/modelManagers/roleManager');
const { Roles } = require('../../database/models');
const { options } = require('../testHelper');

let res;
describe('role manager', () => {
  before(async () => {
    res = await createRole(role);
  });
  after('after delete record', async () => {
    Roles.destroy(options);
  });
  describe('create role', () => {
    it('should confirm that the created role is equal to admin', async () => {
      await createRole(newRole);
      expect(res.role).to.equal('admin');
    });
    it('should confirm that the returned role is equal to admin', async () => {
      const roleId = res.id;
      const dummyRole = await findRole('id', roleId);
      expect(res).to.be.an('object');
      expect(dummyRole.role).to.equal('admin');
    });
    it('should confirm that the delete role is equal to admin', async () => {
      const roleId = res.id;
      const dummyRole = await deleteRole(roleId);
      expect(res).to.be.an('object');
      expect(dummyRole).to.equal(1);
    });
  });
});
