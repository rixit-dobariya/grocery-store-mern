/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - userId
 *               - rating
 *               - review
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 * 
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 * 
 * /reviews/{id}/reply:
 *   put:
 *     summary: Reply to a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reply
 *             properties:
 *               reply:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reply added
 */
