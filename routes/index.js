const router = require('express').Router();

router.use(require('./api-docs'));
router.use('/api/v1', require('./api/index'));

module.exports = router;
