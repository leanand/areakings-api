const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');

const { Team, Request } = Models;

const handleCreateJoinTeam = async (requesterId, requestedTo, payload) => {
  const teamRow = await Team.findById(requestedTo);
  if (!teamRow) {
    throw new errors.ResourceNotFoundError('Team does not exists!');
  }
  const row = await Request.create({
    type:
    requesterId,
    requestedTo,
    payload
  });

  return {};
};

module.exports = {
  handleCreateJoinTeam
};
