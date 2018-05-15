const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

const requireUncached = (moduleName) => {
  delete require.cache[require.resolve(moduleName)];
  return require(moduleName); // eslint-disable-line import/no-dynamic-require
};

const createAndLogin = async () => {
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
  return { agent, JWTToken };
};

module.exports = {
  requireUncached,
  createAndLogin
};
