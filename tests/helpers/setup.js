const config = require('config');

if (config.util.getEnv('NODE_ENV') !== 'test') {
  console.log('NODE_ENV is not in testing. Please check!');
  process.exit();
}
require('./../../index.js');

