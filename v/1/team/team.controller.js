const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');

const { Team } = Models;

const create = async (req, res, next) => {
  const { userId, email: userEmail } = req.authPayload;

  const teamRow = await Team.findByEmail(userEmail);
  if (!teamRow) {
    throw new errors.ResourceNotFoundError('User does not exists!');
  }
  res.send(200, {});
  return next();
};

module.exports = {
  create
};
