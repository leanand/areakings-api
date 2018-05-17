const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('tests/helpers/utils');
const CONSTANTS = require('utils/constants');

const should = chai.should();

chai.use(chaiHttp);

const { expect } = chai;

describe('Request', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');

  it('POST /v/1/request : check if it is authenticated', async () => {
    const res = await chai.request(Server)
      .post('/v/1/request');
    res.should.have.status(403);
  });

  it('POST /v/1/request : should throw 404 when user tries to create request for non-existing team', async () => {
    const { agent } = await Utils.createAndLogin();
    const res = await agent.post('/v/1/request')
      .set('Authorization', agent.getToken())
      .send({ type: 'join-team', requestedTo: '1' });
    res.should.have.status(404);
  });

  it('POST /v/1/request : should create request if team is already existing', async () => {
    const { agent: TeamAdmin } = await Utils.createAndLogin();
    const { agent: newUser } = await Utils.createAndLogin();
    let res = await TeamAdmin.post('/v/1/team')
      .set('Authorization', TeamAdmin.getToken())
      .send({ name: 'ChennaiRockers1', location: 'Chennai da!' });
    res = await newUser.post('/v/1/request')
      .set('Authorization', newUser.getToken())
      .send({ type: 'join-team', requestedTo: 1 });
    res.body.should.have.a.property('id').that.to.equal(1);
    res.body.should.have.a.property('requesterId').that.to.equal(newUser.AKdetails.id);
    res.body.should.have.a.property('type').that.to.equal(CONSTANTS.REQUEST_TYPES.JOIN_TEAM);
    res.body.should.have.a.property('status').that.to.equal(CONSTANTS.REQUEST_STATUS.PENDING);
    res.should.have.status(200);
  });

  it('PUT /v/1/request/accept : should let the team admin see the request', async () => {
    const { agent: TeamAdmin } = await Utils.createAndLogin();
    const { agent: newUser } = await Utils.createAndLogin();
    let res = await TeamAdmin.post('/v/1/team')
      .set('Authorization', TeamAdmin.getToken())
      .send({ name: 'ChennaiRockers1', location: 'Chennai da!' });
    res = await newUser.post('/v/1/request')
      .set('Authorization', newUser.getToken())
      .send({ type: 'join-team', requestedTo: 2 });
    res.should.have.status(200);
    res.body.should.have.a.property('id').that.to.equal(2);
    res.body.should.have.a.property('requesterId').that.to.equal(newUser.AKdetails.id);
    res.body.should.have.a.property('type').that.to.equal(CONSTANTS.REQUEST_TYPES.JOIN_TEAM);
    res.body.should.have.a.property('status').that.to.equal(CONSTANTS.REQUEST_STATUS.PENDING);
    res = await TeamAdmin.get('/v/1/request/forme')
      .set('Authorization', TeamAdmin.getToken())
      .send();
    res.should.have.status(200);
  });
});

