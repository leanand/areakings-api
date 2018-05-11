const _ = require('lodash');

// Checking if all enviromnental variables are set.

const requiredProcessENV = [
  'NODE_PATH',
  'NODE_ENV'
];
const notPresentENV = [];
requiredProcessENV.forEach((env) => {
  if (!_.has(process.env, env)) {
    notPresentENV.push(env);
  }
});

if (notPresentENV.length > 0) {
  throw new Error(`Required Environment Variables are not set: ${notPresentENV}`);
}

require('./utils/logger.js');
require('./init/db.js');
require('./init/restify.js');

