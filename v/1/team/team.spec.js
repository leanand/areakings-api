const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('tests/helpers/utils');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;
const { Team } = Models;

describe('Team', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');
  /* it('POST /v/1/team : check if it is authenticated', async () => {
    const res = await chai.request(Server)
      .post('/v/1/team');
    res.should.have.status(403);
  });

  it('POST /v/1/team : Create team for the logged in user', async () => {
    const { agent } = await Utils.createAndLogin();
    const res = await agent.post('/v/1/team')
      .set('Authorization', agent.getToken())
      .send({ name: 'ChennaiRockers', location: 'Chennai da!' });
    res.body.should.have.a.property('adminId').that.to.equal(agent.AKdetails.id);
    res.body.should.have.a.property('name').that.to.equal('ChennaiRockers');
    res.should.have.status(200);
  });
*/
  it('GET /v/1/team/myteams : The newly created team should be listed', async () => {
    const { agent } = await Utils.createAndLogin();
    const { agent: agent2 } = await Utils.createAndLogin();
    let res = await agent.post('/v/1/team')
      .set('Authorization', agent.getToken())
      .send({ name: 'ChennaiRockers', location: 'Chennai da!' });
    res.should.have.status(200);
    res = await agent2.post('/v/1/team')
      .set('Authorization', agent2.getToken())
      .send({ name: 'ChennaiRockers2', location: 'Chennai da!' });
    res.should.have.status(200);
    const teamRow = await Team.findById(res.body.id);
    await teamRow.addUser(agent.AKdetails.id);
    // let teamRow = Team.find()
    res = await agent.get('/v/1/team/myteams')
      .set('Authorization', agent.getToken());
    res.body.should.be.an('array').to.have.length(2);
    const [res1, res2] = res.body;
    res1.should.have.a.property('adminId').that.to.equal(agent.AKdetails.id);
    res1.should.have.a.property('name').that.to.equal('ChennaiRockers');
    res2.should.have.a.property('adminId').that.to.equal(agent2.AKdetails.id);
    res2.should.have.a.property('name').that.to.equal('ChennaiRockers2');
    res.should.have.status(200);
  });
});

