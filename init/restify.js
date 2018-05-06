const restify = require('restify');

const config = require('config');

const logger = require('../utils/logger.js');

const server = restify.createServer();

const port = config.get('port');

server.listen(port, () => {
  logger.info('%s listening at %s', server.name, server.url);
});
