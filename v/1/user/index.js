const UserController = require('./user.controller');
const { checkParams, handle } = require('utils/helpers.js');
const AuthHelper = require('auth/helpers');

module.exports = (api) => {
  api.get('/v/1/user/me', AuthHelper.isAuthenticated(), handle(UserController.getMe));
};
