/**
 * @swagger
 * /contact-page:
 *   get:
 *     summary: Get contact page content
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Contact page content
 *   put:
 *     summary: Update contact page content
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
