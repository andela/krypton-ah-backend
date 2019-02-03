const router = require('express').Router();
const {
  createRole,
  findRole,
  findAllRole,
  updateRole,
  deleteRole
} = require('../../controllers/roleController');
const RoleValidator = require('../../middlewares/roleValidator');
const jwtValidator = require('../../middlewares/jwtValidator');
const paramsValidator = require('../../middlewares/paramsValidator');
const roleValidator = require('../../lib/utils/roleValidator');

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create Roles
 *     description: It allows admin to create roles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: body
 *         name: role
 *         description: new role to be created
 *         type: string
 *         required: true
 *     responses:
 *       - 200:
 *         description: Role created successfully
 *       - 400:
 *         description: empty role field
 *       - 403:
 *         description: authorized user
 */
router.post('/', jwtValidator, RoleValidator('admin'), roleValidator, createRole);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create Roles
 *     description: It allows admin to create roles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: body
 *         name: role
 *         description: new role to be created
 *         type: string
 *         required: true
 *     responses:
 *       - 200:
 *         description: Role created successfully
 *       - 400:
 *         description: empty role field
 *       - 403:
 *         description: authorized user
 */
router.get('/:id', jwtValidator, RoleValidator('admin'), paramsValidator, findRole);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create Roles
 *     description: It allows admin to create roles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: body
 *         name: role
 *         description: new role to be created
 *         type: string
 *         required: true
 *     responses:
 *       - 200:
 *         description: Role created successfully
 *       - 400:
 *         description: empty role field
 *       - 403:
 *         description: authorized user
 */
router.get('/', jwtValidator, RoleValidator('admin'), findAllRole);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create Roles
 *     description: It allows admin to create roles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: body
 *         name: role
 *         description: new role to be created
 *         type: string
 *         required: true
 *     responses:
 *       - 200:
 *         description: Role created successfully
 *       - 400:
 *         description: empty role field
 *       - 403:
 *         description: authorized user
 */
router.put(
  '/:id',
  jwtValidator,
  RoleValidator('admin'),
  paramsValidator,
  roleValidator,
  updateRole
);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create Roles
 *     description: It allows admin to create roles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: body
 *         name: role
 *         description: new role to be created
 *         type: string
 *         required: true
 *     responses:
 *       - 200:
 *         description: Role created successfully
 *       - 400:
 *         description: empty role field
 *       - 403:
 *         description: authorized user
 */
router.delete('/:id', jwtValidator, RoleValidator('admin'), roleValidator, deleteRole);

module.exports = router;
