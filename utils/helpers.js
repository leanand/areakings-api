const _ = require('lodash');
const errors = require('restify-errors');

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

module.exports = {
  checkParams,
  handleError,
  handle
};
