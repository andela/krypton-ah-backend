const router = require('express').Router();

router.use('/articles/bookmark/', require('./bookmark'));
router.use('/users', require('./authRoutes'));
router.use('/auth', require('./AuthRoute'));
router.use('/articles', require('./articles'));
// router.use('/articles', require('./articleReaction'));
router.use('/articles/rating/', require('./articleRating'));
router.use('/', require('./users'));

router.use('/users', require('./users'));

router.use('/users', require('./users'));
router.use('/comments', require('./commentsReaction'));
router.use(require('./authRoutes'));
router.use('/profile', require('./userProfile'));
router.use('/', require('./tagsRoute'));
router.use('./readstats', require('./readStats'));

module.exports = router;
