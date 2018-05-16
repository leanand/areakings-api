const TeamController = require('./team.controller');
const { checkParams, handle } = require('utils/helpers.js');
const AuthHelper = require('auth/helpers');


module.exports = (api) => {
  api.post('/v/1/team', [AuthHelper.isAuthenticated(), checkParams(['name', 'location'])], handle(TeamController.create));
  api.get('/v/1/team/myteams', AuthHelper.isAuthenticated(), handle(TeamController.getMyTeams));
};
