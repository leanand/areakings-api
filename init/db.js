const Sequelize = require('sequelize');

const config = require('config');

const sequelize = new Sequelize({
  name: config.get('db.name'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  dialect: config.get('db.dialect'),
});

sequelize.authenticate().then(() => {
  Logger.info('Db successfully connected!');
}).catch((err) => {
  Logger.error('Cannot connect DB', err);
});

const models = [
  'User',
];

models.forEach((model) => {
  module.exports[model] = sequelize.import(`${__dirname}/../models/${model}.js`);
});

