const bcrypt = require('bcrypt');
const catchify = require('catchify');
const Utils = require('utils/helpers');
const errors = require('restify-errors');
const authHelpers = require('./helpers');

const { User } = Models;
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userRow = await User.findByEmail(email);
  if (!userRow) {
    throw new errors.NotFoundError('User does not exists');
  }
  const hashPassword = userRow.get('password');
  const match = await bcrypt.compare(password, hashPassword);
  if (match) {
    const jwtToken = authHelpers.createJWTToken(authHelpers.getJWTPayload(userRow));
    res.send(200, { token: jwtToken });
  } else {
    throw new errors.UnauthorizedError('Incorrect email/password');
  }
  return next();
};

module.exports = {
  login
};
