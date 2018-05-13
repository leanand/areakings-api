after((done) => {
  Models.sequelize.truncate()
    .then(() => done());
});
