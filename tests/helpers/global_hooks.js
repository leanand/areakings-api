before((done) => {
  require('tests/helpers/setup.js');
  Models.sequelize.sync({ force: true }).then(() => {
    done();
  }).catch(() => {
    done();
  });
});

after((done) => {
  Server.close();
  Models.sequelize.close();
  done();
});
