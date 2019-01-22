const router = require('express').Router();
const verifyNewUser = require('../../controllers/verificationEmailController');

router.put('/verifyemail/:token', verifyNewUser);

module.exports = router;
