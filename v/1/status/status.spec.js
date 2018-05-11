const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
require('tests/helpers/global_hooks.js');

describe('Status', () => {
  it('GET /v/1/status', (done) => {
    chai.request(Server)
      .get('/v/1/status')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

