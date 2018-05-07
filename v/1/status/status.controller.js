const statusCheck = (req, res, next) => {
  res.send('The Server is running');
  return next();
};

module.exports = {
  statusCheck
};
