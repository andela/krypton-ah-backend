const router = require('express').Router();

router.use('/users', require('./authRoutes'));
router.use('/auth', require('./AuthRoute'));
router.use('/articles/rating/', require('./articleRating'));
router.use('/', require('./users'));
router.use('/articles', require('./articles'));

router.use('/users', require('./users'));

router.use('/users', require('./users'));
router.use('/reaction', require('./commentsReaction'));
router.use(require('./authRoutes'));
router.use('/profile', require('./userProfile'));
router.use('/', require('./tagsRoute'));

module.exports = router;
