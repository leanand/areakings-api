const Register = require('./register.controller');
const { checkParams, handle } = require('utils/helpers.js');

const requiredParams = ['firstName', 'lastName', 'email', 'password'];
module.exports = (api) => {
  api.post('/v/1/register/signup', checkParams(requiredParams), handle(Register.signup));
};
