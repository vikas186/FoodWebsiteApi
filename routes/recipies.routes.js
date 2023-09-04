const express = require('express')
const router = express.Router();
const Recipiescontroller = require('../controller/recipies.controller');
const uploadImage = require('../middleware/fileupload');


/**
 * @swagger
 * /api/recipies/create:
 *   post:
 *     tags:
 *       - recipies
 *     summary: Create a recipe 
 *     consumes:
 *       - multipart/form-data   # Make sure to include this for form-data uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary  # This indicates a file upload
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               preparation:
 *                 type: string
 *               nutrition:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     no:
 *                       type: string
 *                     nutname:
 *                       type: string
 *                     nutvalue:
 *                       type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - image
 *               - title
 *               - subtitle
 *               - preparation
 *               - nutrition
 *               - ingredients
 *     responses:
 *       '201':
 *         description: Recipe created successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.post('/recipies/create', uploadImage.single("image"), Recipiescontroller.createRecipies );

/**
 * @swagger
 * /api/recipies/{id}:
 *   get:
 *     tags:
 *       -  recipies
 *     summary: Find a news by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the news
 *         required: true
 *         schema:
 *           type: string
 *         example: hs-no-35-mohali-address
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/recipies/:id', Recipiescontroller.findRecipies );

/**
 * @swagger
 * /api/recipies:
 *   get:
 *     tags:
 *       -  recipies
 *     summary: 'Get all recipies'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */

router.get('/recipies', Recipiescontroller.findAllRecipies);

/**
 * @swagger
 * /api/recipies/update:
 *   put:
 *     tags:
 *       - recipies
 *     summary: 'Update recipies'
 *     consumes:
 *       - multipart/form-data   # Make sure to include this for form-data uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary  # This indicates a file upload
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               preperation:
 *                 type: string
 *               nutrition:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     no:
 *                       type: string
 *                     nutname:
 *                       type: string
 *                     nutvalue:
 *                       type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               subtitle:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.put('/recipies/update', uploadImage.single('image'), Recipiescontroller.updateRecipies);

/**
 * @swagger
 * /api/recipies/delete:
 *   delete:
 *     tags:
 *       -  recipies
 *     summary: 'delete recipies'
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "642d0bb29daf22457f18685f"
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/recipies/delete', Recipiescontroller.destroyRecipies);


module.exports = router