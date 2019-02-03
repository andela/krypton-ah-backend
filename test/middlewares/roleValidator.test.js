const sinon = require('sinon');
const { expect } = require('chai');
const roleValidator = require('../../middlewares/roleValidator');

describe('createRoleValidator', async () => {
  it('should check if role is an admin', async () => {
    const req = {
      decodedToken: {
        payLoad: {
          role: 'admin'
        }
      }
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };
    const next = sinon.spy();
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await roleValidator('admin')(req, res, next);

    expect(next).to.have.been.callCount(1);
  });

  it('should fail if role is not admin', async () => {
    const req = {
      decodedToken: {
        payLoad: {
          role: 'admin'
        }
      }
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };
    const next = sinon.spy();
    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await roleValidator('asdf')(req, res, next);
    expect(res.status).to.have.been.callCount(1);
  });
});
