const co = require('catchify');

const Utils = require('utils/helpers');

const { User } = Models;

const signup = async (req, res, next) => {
  const phoneNumber = req.body.phone_number;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const [error, isUserExists] = await co(User.find({ phone_number: phoneNumber }));
  if (error) { return Utils.handleError(res, next, error); }
  return next();
};

module.exports = {
  signup
};
