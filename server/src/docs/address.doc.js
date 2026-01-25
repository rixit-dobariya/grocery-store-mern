/**
 * @swagger
 * /address:
 *   post:
 *     summary: Add a new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - fullName
 *               - addressLine1
 *               - city
 *               - state
 *               - zipCode
 *               - country
 *               - mobileNumber
 *             properties:
 *               userId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added
 * 
 * /address/{addressId}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details
 *       404:
 *         description: Address not found
 *   put:
 *     summary: Update an address
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated
 * 
 * /address/user/{userId}:
 *   get:
 *     summary: Get addresses by user ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user addresses
 */
