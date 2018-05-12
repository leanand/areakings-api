const config = require('config');

if (config.util.getEnv('NODE_ENV') !== 'test') {
  throw Error('NODE_ENV is not in testing. Please check!');
}
require('./../../index.js');

