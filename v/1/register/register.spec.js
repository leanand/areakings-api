const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('utils/helpers');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Register', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');

  it('POST /v/1/register/signup : without any parameters, should return 400', async () => {
    const res = await chai.request(Server)
      .post('/v/1/register/signup');
    res.should.have.status(400);
  });
  it('POST /v/1/register/signup : should create user', async () => {
    const res = await chai.request(Server)
      .post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'anand@gmail.com', password: 'testing'
      });
    res.should.have.status(200);
    const row = Models.User.findByEmail('anand@gmail.com');
    expect(row).to.be.not.a('null');
  });
  it('POST /v/1/register/signup : should not create user, it is existing already', async () => {
    const res = await chai.request(Server)
      .post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'anand@gmail.com', password: 'testing'
      });
    res.should.have.status(422);
  });
});

