const path = require('path');

module.exports = {
  options: {
    swaggerDefinition: {
      info: {
        title: 'Author\'s Haven',
        version: '1.0.0',
        description: 'Author\'s Haven api documentation'
      },
      host: process.env.APP_BASE_URL,
      basePath: '/api/v1'
    },
    apis: [
      path.resolve(path.resolve(__dirname), '../routes/**/*.js'),
      path.resolve(path.resolve(__dirname), '../index.js')
    ]
  }
};
