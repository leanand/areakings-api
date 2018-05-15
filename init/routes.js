module.exports = (api) => {
  require('../v/1/status')(api);
  require('../v/1/register')(api);
  require('../v/1/user')(api);
  require('../v/1/request')(api);
  require('../auth')(api);
};
