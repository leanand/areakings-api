const Auth = require('./auth.controller');
const { checkParams, handle } = require('utils/helpers.js');

module.exports = (api) => {
  api.get('/auth/login', checkParams(['email', 'password']), handle(Auth.login));
};
