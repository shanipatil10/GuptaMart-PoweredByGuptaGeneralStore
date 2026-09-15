const db = require("../config/db");

// GET CART BY USER ID
const getCartByUserId = async (userId) => {
    const [rows] = await db.query(
        `SELECT
            c.id AS cart_id,
            c.user_id,
            c.created_at,
            ci.id AS cart_item_id,
            ci.product_id,
            ci.quantity,
            p.name,
            p.price,
            p.image_url
         FROM cart c
         LEFT JOIN cart_items ci ON c.id = ci.cart_id
         LEFT JOIN products p ON ci.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
    );

    return rows;
};


// CREATE CART
const createCart = async (userId) => {
    const [result] = await db.query(
        `INSERT INTO cart (user_id)
         VALUES (?)`,
        [userId]
    );

    return result.insertId;
};

// ADD ITEM TO CART
const addItemToCart = async (cartId, productId, quantity) => {

    // Check product and stock
    const [products] = await db.query(
        `SELECT stock
         FROM products
         WHERE id = ? AND is_active = 1`,
        [productId]
    );

    if (products.length === 0) {
        throw new Error("Product not found");
    }

    const stock = products[0].stock;

    // Check if product already exists in cart
    const [existingItems] = await db.query(
        `SELECT id, quantity
         FROM cart_items
         WHERE cart_id = ? AND product_id = ?`,
        [cartId, productId]
    );

    if (existingItems.length > 0) {

        const newQuantity = existingItems[0].quantity + quantity;

        // Prevent quantity from exceeding stock
        if (newQuantity > stock) {
            throw new Error("Requested quantity exceeds available stock");
        }

        // Increase existing quantity
        await db.query(
            `UPDATE cart_items
             SET quantity = ?
             WHERE id = ?`,
            [newQuantity, existingItems[0].id]
        );

        return existingItems[0].id;
    }

    // New product → check stock
    if (quantity > stock) {
        throw new Error("Requested quantity exceeds available stock");
    }

    // Add new product to cart
    const [result] = await db.query(
        `INSERT INTO cart_items
         (cart_id, product_id, quantity)
         VALUES (?, ?, ?)`,
        [cartId, productId, quantity]
    );

    return result.insertId;
};

// UPDATE CART ITEM QUANTITY
const updateCartItem = async (cartItemId, userId, quantity) => {

    // Check quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
    }

    // Get product stock and verify cart item belongs to user
    const [items] = await db.query(
        `SELECT 
            ci.product_id,
            p.stock
         FROM cart_items ci
         JOIN cart c ON ci.cart_id = c.id
         JOIN products p ON ci.product_id = p.id
         WHERE ci.id = ?
         AND c.user_id = ?`,
        [cartItemId, userId]
    );

    if (items.length === 0) {
        return null;
    }

    const stock = items[0].stock;

    // Check requested quantity against stock
    if (quantity > stock) {
        throw new Error("Requested quantity exceeds available stock");
    }

    // Update quantity
    await db.query(
        `UPDATE cart_items
         SET quantity = ?
         WHERE id = ?`,
        [quantity, cartItemId]
    );

    return true;
};

// REMOVE ITEM FROM CART
// REMOVE ITEM FROM CART
const removeCartItem = async (cartItemId, userId) => {
    const [result] = await db.query(
        `DELETE ci
         FROM cart_items ci
         JOIN cart c ON ci.cart_id = c.id
         WHERE ci.id = ?
         AND c.user_id = ?`,
        [cartItemId, userId]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};


module.exports = {
    getCartByUserId,
    createCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
};