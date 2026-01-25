/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalActiveProducts:
 *                       type: integer
 *                     totalOrders:
 *                       type: integer
 *                     totalCategories:
 *                       type: integer
 *                     totalActiveUsers:
 *                       type: integer
 */
