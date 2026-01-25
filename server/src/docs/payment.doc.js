/**
 * @swagger
 * /payment/create-order:
 *   post:
 *     summary: Create Razorpay order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *                 default: INR
 *     responses:
 *       200:
 *         description: Razorpay order created
 */
