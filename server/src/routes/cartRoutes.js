const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
    getCart,
    createCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
} = require("../controllers/cartController");

const router = express.Router();

// No route changes needed: all cart operations require a verified token, and
// the controller/service scope cart access to the authenticated user's account.
router.get("/", verifyToken, getCart);

router.post("/", verifyToken, createCart);

router.post("/items", verifyToken, addItemToCart);

router.put("/items/:itemId", verifyToken, updateCartItem);

router.delete("/items/:itemId", verifyToken, removeCartItem);

module.exports = router;