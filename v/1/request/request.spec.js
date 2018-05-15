const chai = require('chai');
const chaiHttp = require('chai-http');
const Utils = require('tests/helpers/utils');

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Request', () => {
  Utils.requireUncached('tests/helpers/test_hooks.js');

  it('POST /v/1/request : check if it is authenticated', async () => {
    const res = await chai.request(Server)
      .post('/v/1/request');
    res.should.have.status(403);
  });

  it('POST /v/1/request : Create request for the logged in user', async () => {
    const { agent, JWTToken } = await Utils.createAndLogin();
    const res = await agent.post('/v/1/request')
      .set('Authorization', `Bearer ${JWTToken}`)
      .send({ type: 'join-team', requestedTo: '1' });
    res.should.have.status(200);
  });
});

