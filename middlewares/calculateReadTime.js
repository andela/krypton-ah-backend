const readTimeCalculator = require('../lib/utils/readTimeCalculator');

const calculateReadTime = (req, res, next) => {
  req.body.readTime = readTimeCalculator(req.body.content);
  next();
};

module.exports = calculateReadTime;
