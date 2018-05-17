const Utils = require('utils/helpers');
const errors = require('restify-errors');
const CONSTANTS = require('utils/constants');

const { Team, User } = Models;

const create = async (req, res, next) => {
  const { id: currentUserId, email: userEmail } = req.authPayload;
  const { name, location } = req.body;
  const teamModeln = await Utils.handleTransaction(async (transaction) => {
    const teamModel = await Team.create({
      adminId: currentUserId,
      location,
      name
    }, { transaction });
    await teamModel.addUser(currentUserId, { transaction });
    return teamModel;
  });
  res.send(200, teamModeln.toJSON());
  return next();
};

const getMyTeams = async (req, res, next) => {
  const { id: currentUserId, email: userEmail } = req.authPayload;
  const teamModels = await Team.findAll({
    include: [{
      model: User,
      where: { id: currentUserId }
    }]
  }).then(teams => teams.map(team => team && team.toJSON()));
  res.send(200, teamModels);
  return next();
};

module.exports = {
  create,
  getMyTeams
};
