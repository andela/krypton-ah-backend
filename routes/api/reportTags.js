const router = require('express').Router(),
  ReportTagController = require('../../controllers/reportTagController'),
  tagValidator = require('../../middlewares/reporterValidator'),
  uuidValidator = require('../../middlewares/uuidValidator');

/**
 * @swagger
 *
 * /tags:
 *   get:
 *     description: To get all tags
 *     produces:
 *       - application/json
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
 *     description: To create a new report tag
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
 *     description: To delete a tag
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
