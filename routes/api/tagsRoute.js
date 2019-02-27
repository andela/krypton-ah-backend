const router = require('express').Router();
const { filterTags, getTags } = require('../../controllers/filterTagsController');


/**
 * @swagger
 *
 * /tags:
 *   get:
 *     summary: Search and filter tags based on user's input
 *     description: search and filter tags based on user's input
 *     produces:
 *       - application/json
 *     tags:
 *       - Search routes
 *     parameters:
 *       - any string: string
 *         description: search and filter tags based on user's input
 *         in:  params
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       - 200:
 *         description: Found Tags
 *         message: Below are the matching tags
 *         loginToken: token
 *       - 404:
 *         description: No tags found
 *         message: No tags with the matching string
 *
 */
router.get('/tags/:tag', filterTags);

/**
 * @swagger
 *
 * /tags:
 *   get:
 *     summary: Search and filter tags based on user's input
 *     description: search and filter tags based on user's input
 *     produces:
 *       - application/json
 *     tags:
 *       - Search routes
 *     parameters:
 *       - any string: string
 *         description: search and filter tags based on user's input
 *         in:  params
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       - 200:
 *         description: Found Tags
 *         message: Below are the matching tags
 *         loginToken: token
 *       - 404:
 *         description: No tags found
 *         message: No tags with the matching string
 *
 */
router.get('/tags', getTags);

module.exports = router;
