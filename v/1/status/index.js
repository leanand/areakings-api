const Status = require('./status.controller');

module.exports = (api) => {
  api.get('/v/1/status', Status.statusCheck);
};
