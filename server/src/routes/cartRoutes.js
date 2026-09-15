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

router.get("/", verifyToken, getCart);

router.post("/", verifyToken, createCart);

router.post("/items", verifyToken, addItemToCart);

router.put("/items/:itemId", verifyToken, updateCartItem);

router.delete("/items/:itemId", verifyToken, removeCartItem);

module.exports = router;