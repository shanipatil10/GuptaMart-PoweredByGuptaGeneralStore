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

router.get("/", getOrders);

router.post("/checkout", checkout);
router.post("/", createOrder);

router.post("/items", addOrderItem);
router.get("/:orderId/items", getOrderItems);

router.get("/:id/details", getOrderDetails);
router.put("/:id/status", updateOrderStatus);

router.get("/:id", getOrderById);
module.exports = router;