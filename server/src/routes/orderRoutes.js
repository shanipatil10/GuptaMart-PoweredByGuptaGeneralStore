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

// No route changes needed for active order routes: they require a verified
// token, user reads are scoped to the owner, and status updates check admin role.
// Keep the raw createOrder/addOrderItem routes disabled unless they are redesigned
// to derive user/order ownership from the authenticated account.
router.get("/", verifyToken, getOrders);

router.post("/checkout", verifyToken, checkout);
//router.post("/", createOrder);

//router.post("/items", addOrderItem);
router.get("/:orderId/items", verifyToken, getOrderItems);

router.get("/:id/details", verifyToken, getOrderDetails);
router.put("/:id/status", verifyToken, updateOrderStatus);

router.get("/:id", verifyToken, getOrderById);
module.exports = router;