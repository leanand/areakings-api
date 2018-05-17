const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');
const requestHelper = require('./request.helper');

const { User, Request } = Models;

const create = async (req, res, next) => {
  const { type, requestedTo, payload = {} } = req.body;
  const { id: currentUserId, email: userEmail } = req.authPayload;

  switch (type) {
    case CONSTANTS.REQUEST_TYPES.JOIN_TEAM: {
      const response = await requestHelper.handleJoinTeam(currentUserId, requestedTo, payload);
      res.send(200, response);
      break;
    }
    default:
      res.send(404);
  }
};

const getReceivedRequests = async (req, res, next) => {
  const { id: currentUserId, email: userEmail } = req.authPayload;
};
module.exports = {
  create,
  getReceivedRequests
};

