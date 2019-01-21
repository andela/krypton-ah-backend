const router = require('express').Router();

router.use('/users', require('./authRoutes'));
router.use('/', require('./AuthRoute'));
router.use('/auth', require('./AuthRoute'));

router.use('/users', require('./users'));

module.exports = router;
