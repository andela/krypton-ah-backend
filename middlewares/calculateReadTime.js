const readTimeCalculator = require('../lib/utils/readTimeCalculator');

const calculateReadTime = (req, res, next) => {
  req.body.readtime = readTimeCalculator(req.body.content);
  next();
};

module.exports = calculateReadTime;
