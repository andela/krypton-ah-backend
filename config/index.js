const swaggerConfig = require('./swagger-config');

module.exports = {
  secret:
        process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  swaggerConfigOptions: swaggerConfig.options
};
