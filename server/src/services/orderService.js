const db = require("../config/db");

const getAllOrders = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM orders
        ORDER BY created_at DESC
    `);

    return rows;
};
const getOrderById = async (id) => {
    const [rows] = await db.query(
        `SELECT *
         FROM orders
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};
const createOrder = async (orderData) => {
    const {
        user_id,
        customer_name,
        phone,
        address,
        landmark,
        pincode,
        total_amount,
        payment_method
    } = orderData;

    const [result] = await db.query(
        `INSERT INTO orders
        (user_id, customer_name, phone, address, landmark, pincode, total_amount, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_id,
            customer_name,
            phone,
            address,
            landmark,
            pincode,
            total_amount,
            payment_method
        ]
    );

    return await getOrderById(result.insertId);
};

const addOrderItem = async (orderItemData) => {
    const {
        order_id,
        product_id,
        quantity,
        price
    } = orderItemData;

    const [result] = await db.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)`,
        [
            order_id,
            product_id,
            quantity,
            price
        ]
    );

    return result.insertId;
};

// GET ORDER ITEMS
const getOrderItems = async (orderId) => {
    const [rows] = await db.query(
        `SELECT
            oi.id,
            oi.order_id,
            oi.product_id,
            oi.quantity,
            oi.price,
            p.name,
            p.image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [orderId]
    );

    return rows;
};

const getOrderDetails = async (orderId) => {
    const order = await getOrderById(orderId);

    if (!order) {
        return null;
    }

    const items = await getOrderItems(orderId);

    return {
        ...order,
        items
    };
};

const updateOrderStatus = async (id, order_status) => {
    const [result] = await db.query(
        `UPDATE orders
         SET order_status = ?
         WHERE id = ?`,
        [order_status, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return await getOrderById(id);
};

const getCartItemsForCheckout = async (userId) => {
    const [rows] = await db.query(
        `SELECT
            ci.product_id,
            ci.quantity,
            p.price
         FROM cart c
         JOIN cart_items ci ON c.id = ci.cart_id
         JOIN products p ON ci.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
    );

    return rows;
};

const checkout = async (orderData) => {
    const {
        user_id,
        customer_name,
        phone,
        address,
        landmark,
        pincode,
        payment_method
    } = orderData;

    // 1. Get cart items
    const cartItems = await getCartItemsForCheckout(user_id);

    if (cartItems.length === 0) {
        return null;
    }

    // 2. Calculate total
    const totalAmount = cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    // 3. Create order
    const [orderResult] = await db.query(
        `INSERT INTO orders
        (user_id, customer_name, phone, address, landmark, pincode, total_amount, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_id,
            customer_name,
            phone,
            address,
            landmark,
            pincode,
            totalAmount,
            payment_method || "COD"
        ]
    );

    const orderId = orderResult.insertId;

    // 4. Move cart items to order_items
    for (const item of cartItems) {
        await db.query(
            `INSERT INTO order_items
            (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)`,
            [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]
        );
    }

    // 5. Clear cart
    await db.query(
        `DELETE ci
         FROM cart_items ci
         JOIN cart c ON ci.cart_id = c.id
         WHERE c.user_id = ?`,
        [user_id]
    );

    // 6. Return complete order
    return await getOrderDetails(orderId);
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    addOrderItem,
    getOrderItems,
    getOrderDetails,
    updateOrderStatus,
    getCartItemsForCheckout,
    checkout
};