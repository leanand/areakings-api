before((done) => {
  Models.sequelize.authenticate()
    .then(() => Models.sequelize.sync({ force: true }))
    .then(() => done());
});

after((done) => {
  Server.close();
  Models.sequelize.close()
    .then(() => Models.sequelize.connectionManager.pool.drain())
    .then(() => Models.sequelize.connectionManager.pool.clear())
    .then(() => done());
});
