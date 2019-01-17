const router = require('express').Router();

router.use('/users', require('./authRoutes'));
router.use('/', require('./AuthRoute'));
router.use('/auth', require('./AuthRoute'));


module.exports = router;
