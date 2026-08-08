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
    const [result] = await db.query(
        `INSERT INTO cart_items
        (cart_id, product_id, quantity)
        VALUES (?, ?, ?)`,
        [cartId, productId, quantity]
    );

    return result.insertId;
};


// UPDATE CART ITEM QUANTITY
const updateCartItem = async (cartItemId, quantity) => {
    const [result] = await db.query(
        `UPDATE cart_items
         SET quantity = ?
         WHERE id = ?`,
        [quantity, cartItemId]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};


// REMOVE ITEM FROM CART
const removeCartItem = async (cartItemId) => {
    const [result] = await db.query(
        `DELETE FROM cart_items
         WHERE id = ?`,
        [cartItemId]
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