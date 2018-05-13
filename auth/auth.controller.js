const bcrypt = require('bcrypt');
const catchify = require('catchify');
const Utils = require('utils/helpers');
const errors = require('restify-errors');

const { User } = Models;
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const [userError, userRow] = await catchify(User.findByEmail(email));
  if (!userRow) {
    Logger.debug('User does not exists', req.body);
    return next(new errors.NotFoundError('User does not exists'));
  }
  const hashPassword = userRow.get('password');
  const match = await bcrypt.compare(password, hashPassword);
  if (match) {
    res.send(200);
  } else {
    return next(new errors.UnauthorizedError('Incorrect email/password'));
  }
  return next();
};

module.exports = {
  login
};
