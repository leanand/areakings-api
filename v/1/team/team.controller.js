const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');

const { Team } = Models;

const create = async (req, res, next) => {
  const { id: currentUserId, email: userEmail } = req.authPayload;
  const { name, location } = req.body;
  const teamModel = await Team.create({
    adminId: currentUserId,
    location,
    name
  });
  res.send(200, teamModel.toJSON());
  return next();
};

const getMyTeams = async (req, res, next) => {
  const { id: currentUserId, email: userEmail } = req.authPayload;
  const teamModels = await Team.findByAdmin(currentUserId);
  res.send(200, teamModels);
  return next();
};

module.exports = {
  create,
  getMyTeams
};
