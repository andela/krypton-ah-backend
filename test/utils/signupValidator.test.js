const chai = require('chai'),
  chaiHttp = require('chai-http'),
  app = require('../../index'),
  { should, expect } = chai,
  { BAD_REQUEST_CODE } = require('../../constants/index');

chai.use(chaiHttp);

should();

describe('signup validation test', () => {
  it('should not allowed empty email field to signup', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: '',
        password: 'testTEST@123',
        firstname: 'firstname',
        lastname: 'lastname'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('email');
      });
  });
  it('should not allowed empty password field to signup', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: '',
        firstname: 'test',
        lastname: 'test'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('password');
      });
  });
  it('should not allowed empty firstname field to signup', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'testTEST@123',
        firstname: '',
        lastname: 'test'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('firstname');
      });
  });
  it('should not allowed empty lastname field to signup', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'testTEST@123',
        firstname: 'test',
        lastname: ''
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('lastname');
      });
  });
  it('should not signup with invalid email', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'testtest.com',
        password: 'test@123'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('email');
      });
  });
  it('should not signup will password field less than 8 characters', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'test'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('password');
      });
  });
  it('password field must contain atleast a number', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'abcdABCD'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('password');
      });
  });
  it('password field must contain atleast a lowercase', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'ABCD1234'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('password');
      });
  });
  it('password field must contain atleast an uppercase', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'abcd1234'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('password');
      });
  });
  it('firstname must be an alphabet', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'test@test.com',
        password: 'abcABC123',
        firstname: 'qw12!!@#1',
        lastname: 'test'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('firstname');
      });
  });
  it('lastname must be an alphabet', () => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        eemail: 'test@test.com',
        password: 'abcABC123',
        firstname: '<>:423@#232',
        lastname: '2109@#!asd'
      })
      .end((err, res) => {
        res.should.have.status(BAD_REQUEST_CODE);
        expect(res).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('lastname');
      });
  });
});
