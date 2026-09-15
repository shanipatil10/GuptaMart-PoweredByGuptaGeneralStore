const verifyToken = require("../middleware/authMiddleware");
const express = require("express");

const {
    getOrders,
    getOrderById,
    createOrder,
    addOrderItem,
    getOrderItems,
    getOrderDetails,
    updateOrderStatus, 
    checkout
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", verifyToken, getOrders);

router.post("/checkout", verifyToken, checkout);
//router.post("/", createOrder);

//router.post("/items", addOrderItem);
router.get("/:orderId/items", verifyToken, getOrderItems);

router.get("/:id/details", verifyToken, getOrderDetails);
router.put("/:id/status", verifyToken, updateOrderStatus);

router.get("/:id", verifyToken, getOrderById);
module.exports = router;