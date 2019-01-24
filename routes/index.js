const router = require('express').Router();
router.use('/api/v1/users/resetpassword', require('./api/forgetPassword'));
router.use('/api/v1', require('./api'));
router.use(require('./api-docs'));
router.use('/api/v1', require('./api/index'));
router.use('/api/v1', require('./api/articles'));

module.exports = router;
