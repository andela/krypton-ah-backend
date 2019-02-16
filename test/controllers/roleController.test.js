const chai = require('chai'),
  chaiHttp = require('chai-http'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  {
    createRole,
    findRole,
    findAllRole,
    updateRole,
    deleteRole
  } = require('../../controllers/roleController'),
  { Roles, User } = require('../../database/models'),
  RoleManager = require('../../lib/modelManagers/roleManager'),
  { role, options } = require('../mockData'),
  { adminUser } = require('../../constants/mocks'),
  {
    SERVER_ERROR_CODE,
    RESOURCE_CREATED_CODE,
    CONFLICT_CODE,
    OPERATION_SUCCESSFUL,
    OK_CODE,
    NOT_FOUND_CODE
  } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Role Controller', () => {
  const storage = {};
  before(async () => {
    Roles.destroy(options);
    storage.role = await RoleManager.createRole(role);
    storage.user = await User.create(adminUser);
  });
  after('Delete role', () => {
    if (storage.role) {
      Roles.destroy(options);
    }
    return sinon.restore();
  });
  context('create role controller', () => {
    afterEach(sinon.restore);
    it('should create role', async () => {
      const req = {
        body: {
          role: 'moderator'
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
      await createRole(req, res);
      expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
    });
    it('should throw server error incase of database error', async () => {
      const req = {
        body: {
          role: 'moderator'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(RoleManager, 'findRole').throws();
      sinon.stub(res, 'status').returnsThis();
      await createRole(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
    it('return failure message if role already exist', async () => {
      const req = {
        body: {
          role: 'admin'
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(RoleManager, 'createRole').returns(true);
      sinon.stub(res, 'status').returnsThis();
      await createRole(req, res);
      expect(res.status).to.have.been.calledWith(CONFLICT_CODE);
    });
  });
  context('find role controller', () => {
    afterEach(sinon.restore);
    it('should find role', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
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
      sinon.stub(RoleManager, 'findRole').returns([{ role: 'admin' }]);
      await findRole(req, res);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(OPERATION_SUCCESSFUL);
    });
    it('should return record not found if there is no record', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
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
      sinon.stub(RoleManager, 'findRole').returns();
      await findRole(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    });
    it('should return server error message incase of server error', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
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
      sinon.stub(RoleManager, 'findRole').throws();
      await findRole(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  context('find all role controller', () => {
    afterEach(sinon.restore);
    it('should find all role', async () => {
      const req = {};
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(RoleManager, 'findAllRoles').returns([{ role: 'admin' }]);
      await findAllRole(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('should return server error message incase of server error', async () => {
      const req = {};
      const res = {
        status() {
          return this;
        },
        json() {}
      };
      sinon.spy(res, 'status');
      sinon.spy(res, 'json');
      sinon.stub(RoleManager, 'findAllRoles').throws();
      await findAllRole(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  context('update role controller', () => {
    afterEach(sinon.restore);
    it('should update a role', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
        },
        body: {
          role: 'admin'
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
      sinon.stub(RoleManager, 'findRole').returns([{ role: 'moderator' }]);
      sinon.stub(RoleManager, 'updateRole').returns([{ role: 'admin' }]);
      await updateRole(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('should not update and empty role field', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
        },
        body: {
          role: 'admin'
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
      sinon.stub(RoleManager, 'findRole').returns([]);
      await updateRole(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    });
    it('should throw error message incase of server error', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
        },
        body: {
          role: 'admin'
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
      sinon.stub(RoleManager, 'findRole').throws();
      await updateRole(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
  context('delete role controller', () => {
    afterEach(sinon.restore);
    it('should delete a role', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
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
      sinon.stub(RoleManager, 'deleteRole').returns(1);
      await deleteRole(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
    it('should throw error message incase of server error', async () => {
      const req = {
        params: {
          id: 'cc94832a-19cf-11e9-ab14-d663bd873d33'
        },
        body: {
          role: 'admin'
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
      sinon.stub(RoleManager, 'deleteRole').throws();
      await deleteRole(req, res);
      expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    });
  });
});
