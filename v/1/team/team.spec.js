const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('tests/helpers/utils');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Team', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');
  it('POST /v/1/team : check if it is authenticated', async () => {
    const res = await chai.request(Server)
      .post('/v/1/team');
    res.should.have.status(403);
  });

  it('POST /v/1/team : Create team for the logged in user', async () => {
    const { agent, JWTToken } = await Utils.createAndLogin();
    const res = await agent.post('/v/1/team')
      .set('Authorization', `Bearer ${JWTToken}`)
      .send({ name: 'ChennaiRockers', location: 'Chennai da!' });
    res.body.should.have.a.property('adminId').that.to.equal(1);
    res.body.should.have.a.property('name').that.to.equal('ChennaiRockers');
    res.should.have.status(200);
  });

  it('GET /v/1/team/myteams : The newly created team should be listed', async () => {
    const { agent, JWTToken } = await Utils.createAndLogin();
    let res = await agent.post('/v/1/team')
      .set('Authorization', `Bearer ${JWTToken}`)
      .send({ name: 'ChennaiRockers', location: 'Chennai da!' });
    res.should.have.status(200);
    res = await agent.post('/v/1/team')
      .set('Authorization', `Bearer ${JWTToken}`)
      .send({ name: 'ChennaiRockers2', location: 'Chennai da!' });
    res.should.have.status(200);
    res = await agent.get('/v/1/team/myteams')
      .set('Authorization', `Bearer ${JWTToken}`);
    res.body.should.be.an('array').to.have.length(2);
    const [res1, res2] = res.body;
    res1.should.have.a.property('adminId').that.to.equal(2);
    res1.should.have.a.property('name').that.to.equal('ChennaiRockers');
    res2.should.have.a.property('adminId').that.to.equal(2);
    res2.should.have.a.property('name').that.to.equal('ChennaiRockers2');
    res.should.have.status(200);
  });
});

