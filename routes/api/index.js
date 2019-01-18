const router = require('express').Router();

router.use('/users', require('./authRoutes'));
router.use('/', require('./AuthRoute'));

module.exports = router;
