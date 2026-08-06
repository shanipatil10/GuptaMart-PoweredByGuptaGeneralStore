const getProducts = (req, res) => {
    res.json({
        success: true,
        message: "Products API is working",
        products: []
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;

    res.json({
        success: true,
        message: "Single product API is working",
        productId: id
    });
};

const createProduct = (req, res) => {
    const { name, price, stock, category_id } = req.body;

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: {
            name,
            price,
            stock,
            category_id
        }
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, stock, category_id } = req.body;

    res.json({
        success: true,
        message: "Product updated successfully",
        product: {
            id,
            name,
            price,
            stock,
            category_id
        }
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    res.json({
        success: true,
        message: `Product with ID ${id} deleted successfully`
    });
};


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
