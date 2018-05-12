const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
require('tests/helpers/global_hooks.js');

describe('Register', () => {
  it('POST /v/1/register/signup : without any parameters, should return 400', (done) => {
    chai.request(Server)
      .post('/v/1/register/signup')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('POST /v/1/register/signup : should create user', (done) => {
    chai.request(Server)
      .post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'anand@gmail.com', password: 'testing'
      })
      .end((err, res) => {
        res.should.have.status(200);
        Models.User.findOne({ where: { email: 'anand@gmail.com' } }).then((row) => {
          expect(row).to.be.not.a('null');
          done();
        });
      });
  });
  it('POST /v/1/register/signup : should not create user, it is existing already', (done) => {
    chai.request(Server)
      .post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'anand@gmail.com', password: 'testing'
      })
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

