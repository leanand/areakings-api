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
    console.log(body, arr[i]);
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

module.exports = {
  checkParams,
  handleError
};
