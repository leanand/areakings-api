const _ = require('lodash');
const errors = require('restify-errors');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const checkParams = arr => ((req, res, next) => {
  const missingParams = [];
  let body;
  if (req.method === 'POST' || req.method === 'PUT') {
    ({ body } = req);
  } else {
    ({ query: body } = req);
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (!_.has(body, arr[i])) {
      missingParams.push(arr[i]);
    }
  }
  if (missingParams.length === 0) {
    next();
  } else {
    next(new errors.BadRequestError(`Parameter(s) missing:  ${missingParams.join(',')}`));
  }
});

const handleError = (res, next, err) => {
  Logger.error(err, 'Error while handling request', req);
  next(err);
};

const handle = fn => (async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    Logger.error('Error while handling request', err, req, res);
    if (!(err instanceof errors.HttpError)) {
      err = new errors.InternalServerError(err); // eslint-disable-line no-ex-assign
    }
    next(err);
  }
});

const generateHash = async pwdString => (bcrypt.hash(pwdString, SALT_ROUNDS));

const requireUncached = (moduleName) => {
  delete require.cache[require.resolve(moduleName)];
  return require(moduleName); // eslint-disable-line import/no-dynamic-require
};

module.exports = {
  checkParams,
  handleError,
  handle,
  generateHash,
  requireUncached
};
