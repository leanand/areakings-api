const catchify = require('catchify');
const Utils = require('utils/helpers');
const errors = require('restify-errors');

const { User } = Models;

const getMe = async (req, res, next) => {
  const { id: userId, email: userEmail } = req.authPayload;

  const [error, userRow] = await catchify(User.findByEmail(userEmail));
  if (error) {
    return Utils.handleError(res, next, error);
  }
  if (!userRow) {
    return next(new errors.ResourceNotFoundError('User does not exists!'));
  }
  res.send(200, userRow.toJSON());
  return next();
};

module.exports = {
  getMe
};
