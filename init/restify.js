const restify = require('restify');

const config = require('config');

const server = restify.createServer({
  logger: Logger
});

const port = config.get('port');

server.listen(port, () => {
  Logger.info('%s listening at %s', server.name, server.url);
});

require('./routes.js')(server);

module.exports = server;
