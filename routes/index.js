const router = require('express').Router();

router.use('/api/v1', require('./api'));
router.use(require('./api-docs'));
router.use('/api/v1', require('./api/index'));

module.exports = router;
