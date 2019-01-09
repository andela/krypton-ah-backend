const chai = require('chai'),
    chaiHttp = require('chai-http')
    app = require('../index');

const expect = chai.expect;
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