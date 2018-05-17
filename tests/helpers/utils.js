const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

const requireUncached = (moduleName) => {
  delete require.cache[require.resolve(moduleName)];
  return require(moduleName); // eslint-disable-line import/no-dynamic-require
};

const createAndLogin = async () => {
  const agent = chai.request(Server).keepOpen();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const agentPost = agent.post('/v/1/register/signup');
  const resSignup = await agentPost
    .send({
      firstName, lastName, email, password: 'vedhalovesvikram'
    });
  resSignup.should.have.status(200);
  const resLogin = await agent.post('/auth/login')
    .send({ email, password: 'vedhalovesvikram' });
  resLogin.should.have.status(200);
  resLogin.body.should.have.a.property('token').that.is.a('string');
  const JWTToken = resLogin.body.token;
  const resUser = await agent.get('/v/1/user/me')
    .set('Authorization', `Bearer ${JWTToken}`)
    .send();
  resUser.should.have.status(200);
  resUser.body.should.have.a.property('email').that.to.equal(email);
  resUser.body.should.have.a.property('firstName').that.to.equal(firstName);
  resUser.body.should.have.a.property('lastName').that.to.equal(lastName);
  agent.AKdetails = {
    JWTToken,
    firstName,
    lastName,
    email,
    id: resUser.body.id
  };
  agent.getToken = () => `Bearer ${agent.AKdetails.JWTToken}`;

  return { agent };
};

module.exports = {
  requireUncached,
  createAndLogin
};
