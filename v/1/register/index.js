const Register = require('./register.controller');
const Utils = require('utils/helpers.js');

module.exports = (api) => {
  api.post('/v/1/register/signup', Utils.checkParams(['firstName', 'lastName', 'phoneNumber']), Utils.handle(Register.signup));
};
