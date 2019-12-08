const disableNagle = (req, _res, next) => {
  req.start = process.hrtime();
  req.connection.setNoDelay(true);
  next();
};

module.exports = disableNagle;
