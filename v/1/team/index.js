const TeamController = require('./team.controller');
const { checkParams, handle } = require('utils/helpers.js');
const AuthHelper = require('auth/helpers');


module.exports = (api) => {
  api.post('/v/1/team', [AuthHelper.isAuthenticated()], handle(TeamController.create));
};
