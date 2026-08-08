const productService = require("../services/productService");

// ===============================
// GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

// ===============================
// GET PRODUCT BY ID
// ===============================
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
};

// ===============================
// CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
};

// ===============================
// UPDATE PRODUCT (Dummy for now)
// ===============================
const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update product"
        });
    }
};

// ===============================
// DELETE PRODUCT (Dummy for now)
// ===============================
const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete product"
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};