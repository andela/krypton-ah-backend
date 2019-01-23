const router = require('express').Router();

router.use('/users', require('./authRoutes'));
router.use('/', require('./verifyEmailRoute'));
router.use('/auth', require('./AuthRoute'));
router.use('/articles/rating/', require('./articleRating'));
router.use('/users', require('./users'));

router.use(require('./authRoutes'));
router.use('/profile', require('./userProfile'));

module.exports = router;
