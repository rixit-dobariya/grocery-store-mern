const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlist.controller');
const asyncHandler = require('../utils/asyncHandler');

// Route to add a product to the wishlist
router.post('/:userId/add', asyncHandler(addToWishlist));

// Route to remove a product from the wishlist
router.delete('/:userId/remove', asyncHandler(removeFromWishlist));

// Route to get the user's wishlist
router.get('/:userId', asyncHandler(getWishlist));

module.exports = router;
