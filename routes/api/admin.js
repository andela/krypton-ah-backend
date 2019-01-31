const router = require('express').Router();
const { createRoleController } = require('../../controllers/adminController');
const adminValidator = require('../../middlewares/adminValidator');
const roleValidator = require('../../lib/utils/roleValidator');

router.post('/', adminValidator, roleValidator, createRoleController);

module.exports = router;
