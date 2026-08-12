const cartService = require("../services/cartService");

// GET CART BY USER ID
const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCartByUserId(req.params.userId);

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch cart"
        });
    }
};


// CREATE CART
const createCart = async (req, res) => {
    try {
        const { user_id } = req.body;

        const cartId = await cartService.createCart(user_id);

        res.status(201).json({
            success: true,
            message: "Cart created successfully",
            cartId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create cart"
        });
    }
};


// ADD ITEM TO CART
const addItemToCart = async (req, res) => {
    try {
        const { cart_id, product_id, quantity } = req.body;

        const cartItemId = await cartService.addItemToCart(
            cart_id,
            product_id,
            quantity
        );

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItemId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add product to cart"
        });
    }
};


// UPDATE CART ITEM
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        const updated = await cartService.updateCartItem(
            req.params.itemId,
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

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update cart item"
        });
    }
};


// REMOVE ITEM FROM CART
const removeCartItem = async (req, res) => {
    try {
        const removed = await cartService.removeCartItem(
            req.params.itemId
        );

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed from cart"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to remove product from cart"
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