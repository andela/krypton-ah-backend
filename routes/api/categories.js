const router = require('express').Router();
const categoriesController = require('../../controllers/categories');
const categoryValidator = require('../../middlewares/categoriesValidator');


/**
  * @swagger
  * /get:
  * get:
  *     summary: Search categories by keyword
  *     description: users can search for a category by providing a search keyword
  *     tags:
  *       - Category routes
  *     produces:
  *       - "application/json"
  *     parameters:
  *       - in: query
  *         name: value
  *         description: value is the search query parameter the user pass in to search by
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Below are the matching categories
  *       404:
  *         description: No category found
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.get('/search/:category', categoriesController.getCategories);

/**
  * @swagger
  * /get:
  * get:
  *     summary: Get All categories
  *     description: users can get all categories present in the system.
  *     tags:
  *       - Category routes
  *     produces:
  *       - "application/json"
  *     responses:
  *       200:
  *         description: Categories retrieved successfully
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.get('/', categoriesController.getAllCategories);

/**
  * @swagger
  * /get:
  * get:
  *     summary: Delete categories by keyword
  *     description: users can delete categories by providing the catgory name
  *     tags:
  *       - Category routes
  *     produces:
  *       - "application/json"
  *     parameters:
  *       - in: query
  *         name: value
  *         description: Delete category by
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Below are the matching articles
  *       404:
  *         description: No article with the search parameter
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.delete('/:category', categoriesController.deleteCategories);

/**
  * @swagger
  * /post parameters:
  * post:
  *     summary: Allows the user to create a new category
  *     description: users can create new categories by providing the category name.
  *     tags:
  *       - Category routes
  *     produces:
  *       - "application/json"
  *     parameters:
  *       - in: query
  *         name: value
  *         description: value is the search query parameter the user pass in to search by
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Below are the matching articles
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.post('/', categoryValidator, categoriesController.createCategory);

module.exports = router;
