/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *               - totalAmount
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalAmount:
 *                 type: number
 *               addressId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *         description: Include deleted orders
 *     responses:
 *       200:
 *         description: List of orders
 * 
 * /orders/checkout:
 *   post:
 *     summary: Checkout order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - addressId
 *               - razorpayOrderId
 *               - razorpayPaymentId
 *             properties:
 *               userId:
 *                 type: string
 *               addressId:
 *                 type: string
 *               promoCodeId:
 *                 type: string
 *               razorpayOrderId:
 *                 type: string
 *               razorpayPaymentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Checkout successful
 * 
 * /orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 * 
 * /orders/{orderId}/delete:
 *   patch:
 *     summary: Mark order as deleted (soft delete)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order marked as deleted
 * 
 * /orders/active:
 *   get:
 *     summary: Get all active orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of active orders
 * 
 * /orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user orders
 */
