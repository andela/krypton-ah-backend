const chai = require('chai'),
  chaiHttp = require('chai-http'),
  app = require('../index');


chai.use(chaiHttp);
chai.should();

describe('Server Running Check', () => {
  it('should ensure server is running', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
