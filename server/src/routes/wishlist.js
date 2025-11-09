const express = require("express");
const router = express.Router();
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
} = require("../controllers/wishlist.controller");

router.post("/:userId/add", addToWishlist);
router.delete("/:userId/remove", removeFromWishlist);
router.get("/:userId", getWishlist);

module.exports = router;
