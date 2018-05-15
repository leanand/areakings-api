const Utils = require('utils/helpers');
const errors = require('restify-errors');

const { User } = Models;

const signup = async (req, res, next) => {
  const {
    firstName, lastName, email, password
  } = req.body;
  const isUserExists = await User.findByEmail(email);

  if (isUserExists) {
    throw new errors.UnprocessableEntityError('User already exists');
  }
  const passwordHash = await Utils.generateHash(password);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash
  });

  res.send(200, { id: user.get('id') });
  return next();
};

module.exports = {
  signup
};
