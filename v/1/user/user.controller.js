const catchify = require('catchify');
const Utils = require('utils/helpers');
const errors = require('restify-errors');

const { User } = Models;

const getMe = async (req, res, next) => {
  const { id: userId, email: userEmail } = req.authPayload;

  const userRow = await User.findByEmail(userEmail);
  if (!userRow) {
    throw new errors.ResourceNotFoundError('User does not exists!');
  }
  res.send(200, userRow.toJSON());
  return next();
};

module.exports = {
  getMe
};
