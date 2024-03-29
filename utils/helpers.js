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
  Logger.error(err, 'Error while handling request');
  next(err);
};

const handle = handleFn => (async (req, res, next) => {
  try {
    await handleFn(req, res, next);
  } catch (err) {
    if (!(err instanceof errors.HttpError)) {
      err = new errors.InternalServerError(err); // eslint-disable-line no-ex-assign
      Logger.error('Error while handling request', err, req, res);
    } else {
      Logger.info('Intentional errors: ', err, req, res);
    }
    next(err);
  }
});

const generateHash = async pwdString => (bcrypt.hash(pwdString, SALT_ROUNDS));

const handleTransaction = async (handleFn) => {
  let transaction;
  try {
    transaction = await Models.sequelize.transaction();
    const output = await handleFn(transaction);
    await transaction.commit();
    return output;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

module.exports = {
  checkParams,
  handleError,
  handle,
  generateHash,
  handleTransaction
};
