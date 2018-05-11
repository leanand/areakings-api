const localJson = require('./local.json');
const testJson = require('./test.json');
const productionJson = require('./production.json');

module.exports = {
  development: localJson.db,
  test: testJson.db,
  production: productionJson.db
};
