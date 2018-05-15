const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');
const requestHelper = require('./request.helper');

const { User, Request } = Models;

const create = async (req, res, next) => {
  const { type, requestedTo, payload = {} } = req.body;
  const { userId, email: userEmail } = req.authPayload;

  switch (type) {
    case CONSTANTS.TEAM_TYPES.JOIN_TEAM: {
      const payloadBack = await requestHelper.handleCreateJoinTeam(userId, requestedTo, payload);
      res.send(200, payloadBack);
      break;
    }
    default:
      res.send(404);
  }
};

module.exports = {
  create
};

