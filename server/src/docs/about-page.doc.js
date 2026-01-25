/**
 * @swagger
 * /about-page:
 *   get:
 *     summary: Get about page content
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: About page content
 *   put:
 *     summary: Update about page content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated
 */
