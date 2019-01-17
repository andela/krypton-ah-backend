const chai = require('chai'),
  chaiHttp = require('chai-http'),
  nock = require('nock'),
  app = require('../../');

const { expect } = chai;
chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiaWF0IjoxNTQ4MDI4MDUwLCJleHAiOjE1NDgxMTQ0NTB9.lHUFqEWGUVtSAWUpcFp-oR3Oc_E_xGaj8xuvp9syiGA';

describe('Google account', () => {
  it('should return user details from google', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'job.adelia.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('user');
        done();
      });
  });
  it('should contain email address', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.user).to.contain({ email: 'iafolayan@andela.com' });
        done();
      });
  });
  it('should contain a token', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.user).to.deep.include({ token });
        done();
      });
  });
  it('should return error if user object is not available', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.status).to.be.eql('failed');
        expect(res.body.msg).to.be.eql('Bad Request');
        expect(res.body.user).to.be.an('undefined');
        done();
      });
  });
  it('should contain user firstname', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          lastname: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.firstName).to.be.a('undefined');
        done();
      });
  });

  it('should contain user lastname', (done) => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          firstName: 'Afolayan',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.lastName).to.be.a('undefined');
        done();
      });
  });
});
describe('Facebook account', () => {
  it('should return user details from facebook', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'job.adelia.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('user');
        done();
      });
  });
  it('should contain email address', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.user).to.contain({ email: 'iafolayan@andela.com' });
        done();
      });
  });
  it('should contain a token', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.user).to.deep.include({ token });
        done();
      });
  });
  it('should return error if user object is not available', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.status).to.be.eql('failed');
        expect(res.body.msg).to.be.eql('Bad Request');
        expect(res.body.user).to.be.an('undefined');
        done();
      });
  });
  it('should contain user firstname', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          lastname: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.firstName).to.be.a('undefined');
        done();
      });
  });

  it('should contain user lastname', (done) => {
    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          firstName: 'Afolayan',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.lastName).to.be.a('undefined');
        done();
      });
  });
});
describe('Linkedin account', () => {
  it('should return user details from linkedin', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'job.adelia.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('user');
        done();
      });
  });
  it('should contain email address', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.user).to.contain({ email: 'iafolayan@andela.com' });
        done();
      });
  });
  it('should contain a token', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afolayan',
          lastName: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'success'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.user).to.deep.include({ token });
        done();
      });
  });
  it('should return error if user object is not available', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.status).to.be.eql('failed');
        expect(res.body.msg).to.be.eql('Bad Request');
        expect(res.body.user).to.be.an('undefined');
        done();
      });
  });
  it('should contain user firstname', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          lastname: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.firstName).to.be.a('undefined');
        done();
      });
  });
  it('should contain user lastname', (done) => {
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(400, {
        msg: 'Bad Request',
        user: {
          firstName: 'Afolayan',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.lastName).to.be.a('undefined');
        done();
      });
  });
});
describe('Twitter account', () => {
  it('should contain user firstname', (done) => {
    nock('https://api.twitter.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(500, {
        msg: 'Internal server error',
        user: {
          lastname: 'Ibikunle',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/twitter')
      .end((err, res) => {
        expect(res.body.firstName).to.be.a('undefined');
        done();
      });
  });
  it('should contain user lastname', (done) => {
    nock('https://api.twitter.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(500, {
        msg: 'Internal server error',
        user: {
          firstName: 'Afolayan',
          email: 'iafolayan@andela.com',
          image: 'image.png',
          token
        },
        status: 'failed'
      });
    chai.request(app)
      .get('/api/v1/auth/twitter')
      .end((err, res) => {
        expect(res.body.lastName).to.be.a('undefined');
        done();
      });
  });
});
