const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('utils/helpers');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Auth', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');

  it('POST /auth/login : No parameter should return 400', async () => {
    const res = await chai.request(Server)
      .post('/auth/login');
    res.should.have.status(400);
  });

  it('POST /auth/login : login without no user should return 404', async () => {
    const res = await chai.request(Server)
      .post('/auth/login')
      .send({ email: 'anand@gmail.com', password: 'vedhalovesvikram' });
    res.should.have.status(404);
  });

  it('POST /auth/login : login with proper credentials should return 200', async () => {
    const agent = chai.request(Server).keepOpen();
    const resSignup = await agent.post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'anand@gmail.com', password: 'vedhalovesvikram'
      });
    resSignup.should.have.status(200);
    const resLogin = await agent.post('/auth/login')
      .send({ email: 'anand@gmail.com', password: 'vedhalovesvikram' });
    resLogin.should.have.status(200);
    resLogin.body.should.have.a.property('token').that.is.a('string');
    const JWTToken = resLogin.body.token;
    const resUser = await agent.get('/v/1/user/me')
      .set('Authorization', `Bearer ${JWTToken}`)
      .send();
    resUser.should.have.status(200);
    resUser.body.should.have.a.property('email').that.to.equal('anand@gmail.com');
    resUser.body.should.have.a.property('firstName').that.to.equal('Vikram');
    resUser.body.should.have.a.property('lastName').that.to.equal('Vedha');
  });

  it('POST /auth/login : login with wrong password should return 401', async () => {
    const agent = chai.request(Server).keepOpen();
    const resSignup = await agent.post('/v/1/register/signup')
      .send({
        firstName: 'Vikram', lastName: 'Vedha', email: 'vikram@gmail.com', password: 'vedhalovesvikram1'
      });
    resSignup.should.have.status(200);
    const resLogin = await agent.post('/auth/login')
      .send({ email: 'vikram@gmail.com', password: 'vedhalovesvikram' });
    resLogin.should.have.status(401);
  });

  it('POST /v/1/user/me : should get 403 if no authorization header is present', async () => {
    const res = await chai.request(Server)
      .get('/v/1/user/me')
      .send();
    res.should.have.status(403);
  });
});
