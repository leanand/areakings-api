const Sequelize = require('sequelize');

const config = require('config');

const sequelize = new Sequelize({
  name: config.get('db.name'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  dialect: config.get('db.dialect'),
  database: config.get('db.database'),
  logging: Logger.info.bind(Logger),
});

sequelize.authenticate().then(() => {
  Logger.info('Db successfully connected!');
}).catch((err) => {
  Logger.error('Cannot connect DB', err);
  throw err;
});

const models = [
  'User',
];

global.Models = {};
models.forEach((model) => {
  module.exports[model] = sequelize.import(`${__dirname}/../models/${model}.js`);
  global.Models[model] = module.exports[model];
});

global.Models.sequelize = sequelize;
module.exports.sequelize = sequelize;
