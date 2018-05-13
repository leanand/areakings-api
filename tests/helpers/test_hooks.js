before((done) => {
  Models.sequelize.sync({ force: true })
    .then(() => done());
})
after((done) => {
  Models.sequelize.drop()
    .then(() => done());
});
