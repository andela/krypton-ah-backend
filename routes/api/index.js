const router = require('express').Router();

router.use('/users', require('./authRoutes'));

module.exports = router;
