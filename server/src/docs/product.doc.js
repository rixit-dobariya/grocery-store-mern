/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - description
 *         - discount
 *         - costPrice
 *         - salePrice
 *         - stock
 *         - categoryId
 *       properties:
 *         productName:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         discount:
 *           type: number
 *           description: Discount percentage
 *         costPrice:
 *           type: number
 *           description: Cost price of the product
 *         salePrice:
 *           type: number
 *           description: Selling price of the product
 *         stock:
 *           type: number
 *           description: Available stock quantity
 *         categoryId:
 *           type: string
 *           description: ID of the category the product belongs to
 *         productImage:
 *           type: string
 *           format: binary
 *           description: Image file for the product
 * 
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 * 
 * /products/trending:
 *   get:
 *     summary: Get trending products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of trending products
 * 
 * /products/latest:
 *   get:
 *     summary: Get latest products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of latest products
 * 
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product (soft delete)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product marked as inactive
 *       404:
 *         description: Product not found
 * 
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products in the category
 *       404:
 *         description: No products found for this category
 */
