const { expect } = require('chai');
const chaiHttp = require('chai-http');
const chai = require('chai');
const sinonchai = require('sinon-chai');
const user = require('../../database/models').User;
const app = require('../../index');
const mockData = require('../mockData');
const { userprofile } = require('../../database/models');

chai.use(sinonchai);
chai.use(chaiHttp);
let token;

describe('Test that users are returned when request is made', () => {
  before(async () => {
    await user.bulkCreate([mockData.userdata2, mockData.userdata3]).then(async (newUser) => {
      await userprofile.bulkCreate([mockData.userprofile2, mockData.userprofile3]);
      return newUser;
    });
    token = mockData.token.value;
  });

  it('should return all users when token is present', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/')
      .set('token', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equals('users retrieved succesfully');
    expect(res.body.data[0]).to.contain.property('userprofile');
    expect(res.body.data[0].userprofile).to.contain.property('avatar');
    expect(res.body.data[0].userprofile).to.contain.property('bio');
    expect(res.body.data[0].userprofile).to.contain.property('username');
    expect(res.body.data[0].userprofile).to.contain.property('country');
    expect(res.body.data[0].userprofile).to.contain.property('gender');
  });

  it('should return only 1 user as specified in query limit pagination when token is present ', async () => {
    const res = await chai.request(app).get(`/api/v1/users/?offset=${1}&limit=${1}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equals('users retrieved succesfully');
    expect(res.body.data.length).to.be.equals(1);
    expect(res.body.data[0]).to.contain.property('userprofile');
    expect(res.body.data[0].userprofile).to.contain.property('avatar');
    expect(res.body.data[0].userprofile).to.contain.property('bio');
    expect(res.body.data[0].userprofile).to.contain.property('username');
    expect(res.body.data[0].userprofile).to.contain.property('country');
    expect(res.body.data[0].userprofile).to.contain.property('gender');
  });
});
