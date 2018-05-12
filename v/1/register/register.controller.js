const catchify = require('catchify');

const Utils = require('utils/helpers');

const errors = require('restify-errors');

const { User } = Models;

const signup = async (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const [errorExisting, isUserExists] = await catchify(User.findOne({
    where: {
      phoneNumber
    }
  }));
  if (errorExisting) {
    return Utils.handleError(res, next, errorExisting);
  }
  if (isUserExists) {
    Logger.debug('User already exists', req.body);
    return next(new errors.UnprocessableEntityError('User already exists'));
  }
  const [errorCreate, user] = await catchify(User.create({
    firstName,
    lastName,
    phoneNumber
  }));
  if (errorCreate) {
    return Utils.handleError(res, next, errorCreate);
  }
  res.send(200, { id: user.get('id') });
  return next();
};

module.exports = {
  signup
};
