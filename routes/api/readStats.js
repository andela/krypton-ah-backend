const readStatsRouter = require('express').Router(),
  jwtValidator = require('../../middlewares/jwtValidator'),
  { getUserReadStatController } = require('../../controllers/readStatsController');

readStatsRouter.use(jwtValidator);
/**
 * @swagger
 * /api/v1/readstat:
 *  post:
 *    summary: Get the read statistics of user
 *    description: Returns the articles title and description for an authenticated user
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: uuid of the authenticated user
 *        in: jwt token
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Sucessfully get user's readstat
 *        schema:
 *          type: object
 *      500:
 *        description: Error getting user's readstat
 *        schema:
 *          type: object
 */

readStatsRouter.route('/').get(getUserReadStatController);

module.exports = readStatsRouter;
