const RequestController = require('./request.controller');
const { checkParams, handle } = require('utils/helpers.js');
const AuthHelper = require('auth/helpers');

module.exports = (api) => {
  api.post('/v/1/request', [AuthHelper.isAuthenticated(), checkParams(['type', 'requestedTo'])], handle(RequestController.create));
  api.get('/v/1/request/me', AuthHelper.isAuthenticated(), handle(RequestController.getReceivedRequests));
};
