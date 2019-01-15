const router = require('express').Router(),
  swaggerJSDoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express'),
  swaggerSpec = swaggerJSDoc(require('../../config').swaggerConfigOptions);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
