const chai = require('chai'),
  chaiHttp = require('chai-http'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  {
    assignRoleToUser,
    getUserRoles,
    deleteUserRole
  } = require('../../controllers/userRoleController'),
  RoleManager = require('../../lib/modelManagers/roleManager'),
  userManager = require('../../lib/modelManagers/usermodel'),
  userRoleManager = require('../../lib/modelManagers/userRoleManager'),
  {
    CONFLICT_CODE, OK_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

describe('USER ROLE CONTROLLER', () => {
  after('Delete role', () => sinon.restore());
  context('assign role to a user controller', () => {
    afterEach(sinon.restore);
    it('should assign role to a user', async () => {
      const req = {
        body: {
          role: 'admin',
          email: 'itguy@gmail.com'
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      const users = { addRoles: () => {} };
      sinon.stub(RoleManager, 'findRole').returns([{ role: 'admin' }]);
      sinon.stub(userManager, 'findUserByEmail').returns(users);
      sinon.stub(users, 'addRoles').returns([{ user: 'lucky' }]);
      await assignRoleToUser(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('return failure message if role does not exist on role table', async () => {
      const req = {
        body: {
          role: 'moderator',
          email: 'lumpsey@gmail.com'
        }
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(RoleManager, 'findRole').returns([{ role: 'moderator' }]);
      sinon.stub(res, 'status').returnsThis();
      await assignRoleToUser(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    });
    it('return failure message if email does not exist on user table', async () => {
      const req = {
        body: {
          role: 'admin',
          email: 'lumpsey@gmail.com'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(userManager, 'findUserByEmail').returns([]);
      sinon.stub(res, 'status').returnsThis();
      await assignRoleToUser(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    });
    it('return failure message if role is already assigned to the user', async () => {
      const req = {
        body: {
          role: 'admin',
          email: 'itguy@gmail.com'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      const user = { addRoles: () => {} };
      sinon.stub(RoleManager, 'findRole').returns([{ role: 'admin' }]);
      sinon.stub(userManager, 'findUserByEmail').returns(user);
      sinon.stub(user, 'addRoles').returns([]);
      sinon.stub(res, 'status').returnsThis();
      await assignRoleToUser(req, res);
      expect(res.status).to.have.been.calledWith(CONFLICT_CODE);
    });
    it('return server error message incase of server error', async () => {
      const req = {
        body: {
          role: 'admin',
          email: 'itguy@gmail.com'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(RoleManager, 'findRole').throws();
      sinon.stub(res, 'status').returnsThis();
      await assignRoleToUser(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  context('get a user and all associated roles controller', () => {
    afterEach(sinon.restore);
    it('should get all users and their roles', async () => {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      const user = { getRoles: () => ({ id: 1 }) };
      sinon.stub(userManager, 'findUser').returns(user);
      sinon.stub(user, 'getRoles').returns([{ role: 'admin' }]);
      await getUserRoles(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('return failure message if user does not exist on user table', async () => {
      const req = {
        params: {
          id: 3
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(userManager, 'findUser').returns(false);
      sinon.stub(res, 'status').returnsThis();
      await getUserRoles(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('return failure message if user does not have any role', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      const user = { getRoles: () => [] };
      sinon.stub(userManager, 'findUser').returns(user);
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(user, 'getRoles').returns([]);
      await getUserRoles(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('return server error message incase of server error', async () => {
      const req = {
        params: {
          id: -2
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(RoleManager, 'findRole').throws();
      sinon.stub(res, 'status').returnsThis();
      await getUserRoles(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  context('delete user role controller', () => {
    it('should delete a particular user role', async () => {
      const req = {
        params: {
          userId: 1,
          roleId: 2
        }
      };
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(userRoleManager, 'deleteUserRole').returns(1);
      await deleteUserRole(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
  });
});
