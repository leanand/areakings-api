const restify = require('restify');
const config = require('config');
const bunyan = require('bunyan');
const bodyParser = require('body-parser');

const server = restify.createServer({
  log: Logger
});
const port = config.get('port');


server.use(bodyParser());
server.on('after', restify.plugins.auditLogger({
  log: Logger,
  event: 'after',
}));

require('./routes.js')(server);

server.listen(port, () => {
  Logger.info('%s listening at %s', server.name, server.url);
});

global.Server = server;
module.exports = server;
