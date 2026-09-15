const cartService = require("../services/cartService");
const db = require("../config/db");

// GET CART BY USER ID
const getCart = async (req, res) => {
    try {
        // Firebase UID from verified token
        const firebaseUid = req.user.uid;

        // Find MySQL user ID using Firebase UID
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

        // Get cart using MySQL user ID
        const cart = await cartService.getCartByUserId(userId);

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("Get Cart Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch cart"
        });
    }
};
// CREATE CART
const createCart = async (req, res) => {
    try {
        // Firebase UID from verified token
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

        // Check if cart already exists
        const [existingCart] = await db.query(
            `SELECT id FROM cart WHERE user_id = ?`,
            [userId]
        );

        // If cart already exists, return it
        if (existingCart.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Cart already exists",
                cartId: existingCart[0].id
            });
        }

        // Create new cart
        const cartId = await cartService.createCart(userId);

        res.status(201).json({
            success: true,
            message: "Cart created successfully",
            cartId
        });

    } catch (error) {
        console.error("Create Cart Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create cart"
        });
    }
};
// ADD ITEM TO CART
const addItemToCart = async (req, res) => {
    try {
        // Firebase UID from verified token
        const firebaseUid = req.user.uid;

        // Get product details from request
        const { product_id, quantity } = req.body;

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

        // Find cart belonging to authenticated user
        const [carts] = await db.query(
            `SELECT id FROM cart WHERE user_id = ?`,
            [userId]
        );

        if (carts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const cartId = carts[0].id;

        // Add product to user's cart
        const cartItemId = await cartService.addItemToCart(
            cartId,
            product_id,
            quantity
        );

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItemId
        });

    } catch (error) {
        console.error("Add Cart Item Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add product to cart"
        });
    }
};

// UPDATE CART ITEM
// UPDATE CART ITEM QUANTITY
const updateCartItem = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const { quantity } = req.body;
        const cartItemId = req.params.itemId;


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

        // Update only if cart item belongs to authenticated user
        const updated = await cartService.updateCartItem(
            cartItemId,
            userId,
            quantity
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart item updated successfully"
        });

    } 
    catch (error) {
    console.error("Update Cart Item Error:", error);

    if (
        error.message === "Quantity must be a positive integer" ||
        error.message === "Requested quantity exceeds available stock"
    ) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    return res.status(500).json({
        success: false,
        message: "Failed to update cart item"
    });
}
};

// REMOVE ITEM FROM CART
// REMOVE ITEM FROM CART
const removeCartItem = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const cartItemId = req.params.itemId;

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

        // Remove only if cart item belongs to authenticated user
        const removed = await cartService.removeCartItem(
            cartItemId,
            userId
        );

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart item removed successfully"
        });

    } catch (error) {
        console.error("Remove Cart Item Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove cart item"
        });
    }
};


module.exports = {
    getCart,
    createCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
};