const chai = require('chai'),
  chaiHttp = require('chai-http'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { createRoleController } = require('../../controllers/adminController'),
  { Roles } = require('../../database/models'),
  userRoleManager = require('../../lib/modelManagers/userRoleManager'),
  { role, options } = require('../mockData'),
  { SERVER_ERROR_CODE, ROLE_CREATED, BAD_REQUEST_CODE } = require('../../constants/index');

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

describe('create role Controller', () => {
  const storage = {};
  before(async () => {
    Roles.destroy(options);
    storage.role = await userRoleManager.createAdminRole(role);
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
      await createRoleController(req, res);
      expect(res.json.firstCall.lastArg).to.be.an('object');
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('success')
        .equal(true);
      expect(res.json.firstCall.lastArg)
        .to.haveOwnProperty('message')
        .equal(ROLE_CREATED);
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
      sinon.stub(userRoleManager, 'findRole').throws();
      sinon.stub(res, 'status').returnsThis();
      await createRoleController(req, res);
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
      sinon.stub(userRoleManager, 'createAdminRole').returns(true);
      sinon.stub(res, 'status').returnsThis();
      await createRoleController(req, res);
      expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
    });
  });
});
