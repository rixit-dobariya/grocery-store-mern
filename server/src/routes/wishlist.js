import express from 'express';
const router = express.Router();
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlist.controller.js';

// Route to add a product to the wishlist
router.post('/:userId/add', addToWishlist);

// Route to remove a product from the wishlist
router.delete('/:userId/remove', removeFromWishlist);

// Route to get the user's wishlist
router.get('/:userId', getWishlist);

export default router;
