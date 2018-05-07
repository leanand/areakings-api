const Register = require('./register.controller');
const Utils = require('utils/helpers.js');

module.exports = (api) => {
  api.post('/v/1/register/signup', Utils.checkParams(['first_name', 'last_name', 'phone_number']), Register.signup);
};
