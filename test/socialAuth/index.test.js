const chai = require('chai'),
  chaiHttp = require('chai-http'),
  nock = require('nock'),
  app = require('../../');

const { expect } = chai;
chai.use(chaiHttp);

describe('Signs up user with their Google account', () => {
  before(() => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Afld',
          lastName: 'n\'okla',
          email: 'job.andela.com',
          token: 'token'
        },
        status: 'success'
      });

    nock('https://www.facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Mo\'rin',
          lastName: 'd\'okla',
          email: 'job.adelia.com',
          image: 'image.png',
          token: 'token'
        },
        status: 'success'
      });
    nock('https://api.twitter.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Mo\'rin',
          lastName: 'david',
          username: 'corn',
          email: 'job.andela.com',
          image: 'image.png',
          token: 'token'
        },
        status: 'success'
      });
    nock('https://www.linkedin.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        msg: 'Welcome',
        user: {
          id: 10,
          firstName: 'Mo\'rin',
          lastName: 'david',
          username: 'corn',
          email: 'job.andela.com',
          image: 'image.png',
          token: 'token'
        },
        status: 'success'
      });
  });

  it('Authenticates with google', (done) => {
    chai.request(app)
      .get('/api/v1/auth/google')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        done();
      });
  });

  it('Authenticates with facebook', (done) => {
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        done();
      });
  });
  it('Authenticates with linkedin', (done) => {
    chai.request(app)
      .get('/api/v1/auth/linkedin')
      .end((err, res) => {
        expect(res.body.msg).to.be.equal('Welcome');
        expect(res.body.status).to.be.equal('success');
        done();
      });
  });
});
