/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banners
 *   post:
 *     summary: Add a new banner
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - bannerImage
 *             properties:
 *               bannerImage:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               link:
 *                 type: string
 *               type:
 *                 type: string
 *                 default: slider
 *     responses:
 *       201:
 *         description: Banner added successfully
 * 
 * /banners/{bannerId}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner details
 *       404:
 *         description: Banner not found
 *   put:
 *     summary: Update a banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bannerImage:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner updated
 *   delete:
 *     summary: Delete a banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner deleted
 * 
 * /banners/{bannerId}/status:
 *   patch:
 *     summary: Toggle banner status
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
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
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status updated
 */
