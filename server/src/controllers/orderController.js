const orderService = require("../services/orderService");
const db = require("../config/db");

// GET ALL ORDERS
// GET MY ORDERS
const getOrders = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;

        // Find MySQL user using Firebase UID
        const [users] = await db.query(
            `SELECT id FROM users WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = users[0].id;

        // Get only this user's orders
        const orders = await orderService.getOrdersByUserId(userId);

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};

// GET ORDER BY ID
const getOrderById = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const orderId = req.params.id;

        const [users] = await db.query(
            `SELECT id FROM users WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = users[0].id;

        const order = await orderService.getOrderByIdForUser(
            orderId,
            userId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
};

const getOrderByIdForUser = async (orderId, userId) => {
    const [rows] = await db.query(
        `SELECT *
         FROM orders
         WHERE id = ?
         AND user_id = ?`,
        [orderId, userId]
    );

    return rows[0];
};

// CREATE ORDER
const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
};

// ADD ORDER ITEM
const addOrderItem = async (req, res) => {
    try {
        const orderItemId = await orderService.addOrderItem(req.body);

        res.status(201).json({
            success: true,
            message: "Order item added successfully",
            orderItemId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add order item"
        });
    }
};

// GET ORDER ITEMS
const getOrderItems = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const orderId = req.params.orderId;

        const [users] = await db.query(
            `SELECT id FROM users WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = users[0].id;

        const order = await orderService.getOrderByIdForUser(
            orderId,
            userId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const items = await orderService.getOrderItems(orderId);

        res.status(200).json({
            success: true,
            items
        });

    } catch (error) {
        console.error("Get Order Items Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order items"
        });
    }
};

// GET ORDER DETAILS
const getOrderDetails = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const orderId = req.params.id;

        const [users] = await db.query(
            `SELECT id FROM users WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = users[0].id;

        const order = await orderService.getOrderDetailsForUser(
            orderId,
            userId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get Order Details Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order details"
        });
    }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const { order_status } = req.body;
        const orderId = req.params.id;

        const [users] = await db.query(
            `SELECT id, role
             FROM users
             WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = users[0];

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Packed",
    "Delivered",
    "Cancelled"
];

if (!allowedStatuses.includes(order_status)) {
    return res.status(400).json({
        success: false,
        message: "Invalid order status"
    });
}

        const order = await orderService.updateOrderStatus(
            orderId,
            order_status
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update Order Status Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update order status"
        });
    }
};

// CHECKOUT
// CHECKOUT
const checkout = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;

        const {
            customer_name,
            phone,
            address,
            landmark,
            pincode,
            payment_method
        } = req.body;

        // Input validation

if (!customer_name || !customer_name.trim()) {
    return res.status(400).json({
        success: false,
        message: "Customer name is required"
    });
}

if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({
        success: false,
        message: "Valid 10-digit phone number is required"
    });
}

if (!address || !address.trim()) {
    return res.status(400).json({
        success: false,
        message: "Address is required"
    });
}

if (!pincode || !/^\d{6}$/.test(pincode)) {
    return res.status(400).json({
        success: false,
        message: "Valid 6-digit pincode is required"
    });
}

if (payment_method !== "COD") {
    return res.status(400).json({
        success: false,
        message: "Only COD payment is currently supported"
    });
}

        // Find MySQL user using Firebase UID
        const [users] = await db.query(
            `SELECT id FROM users WHERE firebase_uid = ?`,
            [firebaseUid]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userId = users[0].id;

        // Prepare order data
        const orderData = {
            user_id: userId,
            customer_name,
            phone,
            address,
            landmark,
            pincode,
            payment_method
        };

        const order = await orderService.checkout(orderData);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        if (order.stockError) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
                productId: order.productId,
                requested: order.requested,
                available: order.available
            });
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Checkout Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    addOrderItem,
    getOrderItems,
    getOrderDetails,
    updateOrderStatus,
    checkout
};