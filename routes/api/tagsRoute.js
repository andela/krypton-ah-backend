const router = require('express').Router();
const filterTags = require('../../controllers/filterTagsController');


/**
 * @swagger
 *
 * /tags:
 *   get:
 *     description: search and filter tags based on user's input
 *     produces:
 *       - application/json
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

module.exports = router;
