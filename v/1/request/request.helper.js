const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');

const { Team, Request } = Models;

const handleJoinTeam = async (requesterId, requestedTo, payload) => {
  const teamRow = await Team.findById(requestedTo);
  if (!teamRow) {
    throw new errors.ResourceNotFoundError('Team does not exists!');
  }
  const row = await Request.create({
    type: CONSTANTS.REQUEST_TYPES.JOIN_TEAM,
    requesterId,
    requestedTo,
    payload,
    status: CONSTANTS.REQUEST_STATUS.PENDING
  });

  return row.toJSON();
};

module.exports = {
  handleJoinTeam
};
