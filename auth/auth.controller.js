const bcrypt = require('bcrypt');
const catchify = require('catchify');
const Utils = require('utils/helpers');
const errors = require('restify-errors');

const { User } = Models;
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const [userError, userRow] = await catchify(User.findOne());
  return next();
};

module.exports = {
  login
};
