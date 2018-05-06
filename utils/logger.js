const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'areakings-api' });
log.info('Logger is initialized');

global.Logger = log;
module.exports = log;
