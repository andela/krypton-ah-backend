const jwt = require('jsonwebtoken');

const generateUserToken = (payload, time) => {
  const token = jwt.sign({
    payload
  }, process.env.JWT_SECRET_KEY, time);
  return token;
};

module.exports = generateUserToken;
