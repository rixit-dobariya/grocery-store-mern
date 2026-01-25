/**
 * @swagger
 * /wishlist/{userId}:
 *   get:
 *     summary: Get user wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User wishlist
 * 
 * /wishlist/{userId}/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added to wishlist
 * 
 * /wishlist/{userId}/remove:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 */
