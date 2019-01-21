const router = require('express').Router();
const Users = require('../../controllers/Users/userController');

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List all the users present in the system
 *     description: Returns a list of all the users along with their profiels
 *     tags:
 *       - Get all users route
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: limit
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: List of users
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               description: all the users
 *               items:
 *                 type: array
 *       400:
 *         description: No user returned
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               description: no user returned
 *               items:
 *                 type: array
 */
router.get('/', Users.listUsers);

module.exports = router;
