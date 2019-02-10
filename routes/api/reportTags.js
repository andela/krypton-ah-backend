const router = require('express').Router(),
  ReportTagController = require('../../controllers/reportTagController'),
  tagValidator = require('../../middlewares/reporterValidator'),
  uuidValidator = require('../../middlewares/uuidValidator');

/**
 * @swagger
 *
 * /reporttags:
 *   get:
 *     summary: Get all report tags
 *     description: To get all tags
 *     produces:
 *       - application/json
 *     tags:
 *       - Report tag routes
 *     responses:
 *        - 200:
 *          description: retrieve all tags
 *          message: Report tag retrieved successfully
 *          Data: tags
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.get('/tags', ReportTagController.getTags);

/**
 * @swagger
 *
 * /tag:
 *   post:
 *     summary: Create a report tag
 *     description: To create a new report tag
 *     tags:
 *       - Report tag routes
 *     produces:
 *       - application/json
 *     responses:
 *        - 200:
 *          description: report tag
 *          message: Report tag created successfully
 *          Data: tag
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.post('/tag', tagValidator, ReportTagController.createTag);

/**
 * @swagger
 *
 * /tag/:tagId:
 *   delete:
 *     summary: Delete a report tag
 *     description: To delete a tag
 *     tags:
 *       - Report tag routes
 *     produces:
 *       - application/json
 *     responses:
 *        - 200:
 *          description: delete a tag
 *          message: Report tag deleted successfully
 *          Data: null
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.delete('/tag/:tagId', uuidValidator, ReportTagController.deleteReportTag);

module.exports = router;
