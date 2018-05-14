const RequestController = require('./request.controller');
const { checkParams, handle } = require('utils/helpers.js');
const AuthHelper = require('auth/helpers');

module.exports = (api) => {
  api.post('/v/1/request', AuthHelper.isAuthenticated(), handle(RequestController.create));
};
