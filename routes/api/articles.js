const router = require('express').Router();
const ArticlesController = require('../../controllers/Articles/articlesController');
const verify = require('../../middlewares/jwtValidator');

/**
 * @swagger
 *
 * /create an article:
 *   post:
 *     description: To create an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: The title of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: description
 *         description: A short description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The main content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A unique identifier for the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The id of the author
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *        - 200:
 *          description: articles
 *          message: articles created succesfully
 *          Data: articles
 *        - 404:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.post('/', verify, ArticlesController.createArticles);

/**
 * @swagger
 *
 * /create an article:
 *   post:
 *     description: To update an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: The updated title of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: description
 *         description: A short update description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The update content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The update url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A update description of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The authorId
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *       - 200:
 *         description: articles
 *         message: articles updated succesfully
 *         Data: articles
 *       - 404:
 *         description: Server Error
 *         message: There as been a server error
 *       - 400:
 *         description: updated failed
 *         message: The update is unsuccessful
 *
 *
 */
router.put('/:id', verify, ArticlesController.updateArticle);

/**
 * @swagger
 *
 * /get an article:
 *   post:
 *     description: To get an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: description
 *         description: A short update description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The update content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The update url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A update description of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The authorId
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *        - 200:
 *          description: articles
 *          message: articles retrieved succesfully
 *          Data: articles
 *        - 404:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.get('/', ArticlesController.getArticle);

/**
 * @swagger
 *
 * /delete:
 *   post:
 *     description: Deletes articles from the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the article to be deleted
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       - 200:
 *         description: Delete
 *         message: Delete Successful
 *       - 400:
 *         description: delete failed
 */
router.delete('/:id', ArticlesController.deleteArticle);

module.exports = router;
