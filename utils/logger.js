const bunyan = require('bunyan');

const restify = require('restify');

const config = require('config');

const logger = bunyan.createLogger({
  name: 'areakings-api',
  level: config.get('logLevel'),
});

logger.info('Logger is initialized');

global.Logger = logger;
module.exports = logger;
