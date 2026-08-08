const express = require("express");

const {
    getCart,
    createCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
} = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCart);

router.post("/", createCart);

router.post("/items", addItemToCart);

router.put("/items/:itemId", updateCartItem);

router.delete("/items/:itemId", removeCartItem);

module.exports = router;