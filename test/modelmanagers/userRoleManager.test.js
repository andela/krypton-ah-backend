const chai = require('chai'),
  { expect } = require('chai'),
  chaiHttp = require('chai-http'),
  sinonChai = require('sinon-chai'),
  UserRoleManager = require('../../lib/modelManagers/userRoleManager');

chai.use(sinonChai);
chai.use(chaiHttp);

describe('UserRoleManager', () => {
  it('it should delete a user role', async () => {
    const userId = 'ad94832a-19cf-11e9-ab14-d663bd873e29';
    const roleId = '7d94832a-19cf-11e9-ab14-d663bd873e20';
    const deletedUserCount = await UserRoleManager.deleteUserRole(userId, roleId);
    expect(deletedUserCount).is.equal(0);
  });
});
