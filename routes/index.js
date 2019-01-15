const router = require('express').Router();

router.use('/api', require('./api'));
router.use(require('./api-docs'));

module.exports = router;
