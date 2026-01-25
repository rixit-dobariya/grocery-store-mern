/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Get all responses (inquiries)
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: List of responses
 *   post:
 *     summary: Create a new response (inquiry)
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Response created
 * 
 * /responses/{id}:
 *   get:
 *     summary: Get response by ID
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Response details
 *       404:
 *         description: Response not found
 *   delete:
 *     summary: Delete a response
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Response deleted
 * 
 * /responses/{id}/reply:
 *   put:
 *     summary: Reply to a response
 *     tags: [Responses]
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
 *         description: Reply updated
 */
