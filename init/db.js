const Sequelize = require('sequelize');

const config = require('config');

const sequelize = new Sequelize({
  name: config.get('db.name'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  dialect: config.get('db.dialect'),
  database: config.get('db.database'),
  logging: Logger.info.bind(Logger),
  define: {
    timestamps: true,
    charset: 'utf8',
    underscored: false,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 1000,
  },
});

sequelize.authenticate().then(() => {
  Logger.info('Db successfully connected!');
}).catch((err) => {
  Logger.error('Cannot connect DB', err);
  throw new Error('Cannot Connect DB', err);
  // process.exit(1);
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
