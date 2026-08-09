const orderService = require("../services/orderService");

// GET ALL ORDERS
const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};
// GET ORDER BY ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);

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
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
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
        const items = await orderService.getOrderItems(req.params.orderId);

        res.status(200).json({
            success: true,
            items
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order items"
        });
    }
};

// GET ORDER DETAILS
const getOrderDetails = async (req, res) => {
    try {
        const order = await orderService.getOrderDetails(req.params.id);

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
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch order details"
        });
    }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    try {
        const { order_status } = req.body;

        const order = await orderService.updateOrderStatus(
            req.params.id,
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
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update order status"
        });
    }
};

// CHECKOUT
const checkout = async (req, res) => {
    try {
        const order = await orderService.checkout(req.body);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
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