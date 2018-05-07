const bunyan = require('bunyan');

const restify = require('restify');

const logger = bunyan.createLogger({
  name: 'areakings-api',
});

logger.info('Logger is initialized');

global.Logger = logger;
module.exports = logger;
