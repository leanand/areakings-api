const jwt = require('jsonwebtoken');
const config = require('config');
const errors = require('restify-errors');

const createJWTToken = payload => (
  jwt.sign(
    {
      payload
    },
    config.get('jwt.secret_key'),
    {
      expiresIn: config.get('jwt.expiry')
    }
  )
);

const getJWTPayload = User => ({ id: User.get('id'), email: User.get('email') });

const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, config.get('jwt.secret_key'));
  } catch (err) {
    return null;
  }
};

const isAuthenticated = () => ((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new errors.ForbiddenError('Authentication Header Missing'));
  }
  const parts = authorization.split(' ');
  if (parts.length !== 2 || /^Bearer$/i.test(parts[0]) !== true) {
    return next(new errors.InvalidHeaderError('Invalid authorization header'));
  }
  const isValid = verifyJWTToken(parts[1]);
  if (!isValid) {
    return next(new errors.InvalidCredentialsError('Invalid/Expired JWT Token'));
  }
  req.authPayload = isValid.payload;
  return next();
});

module.exports = {
  createJWTToken,
  getJWTPayload,
  verifyJWTToken,
  isAuthenticated
};
