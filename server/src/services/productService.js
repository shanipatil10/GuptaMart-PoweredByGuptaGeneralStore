const db = require("../config/db");

const getAllProducts = async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
};

const getProductById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM products WHERE id = ?",
        [id]
    );

    return rows[0];
};

const createProduct = async (productData) => {
    const {
        category_id,
        name,
        slug,
        description,
        price,
        stock,
        unit
    } = productData;

    const [result] = await db.query(
        `INSERT INTO products
        (category_id, name, slug, description, price, stock, unit)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            category_id,
            name,
            slug,
            description,
            price,
            stock,
            unit
        ]
    );

    return await getProductById(result.insertId);
};

const updateProduct = async (id, productData) => {
    const {
        name,
        slug,
        description,
        price,
        stock,
        unit,
        category_id
    } = productData;

    const [result] = await db.query(
        `UPDATE products
         SET category_id = ?,
             name = ?,
             slug = ?,
             description = ?,
             price = ?,
             stock = ?,
             unit = ?
         WHERE id = ?`,
        [
            category_id,
            name,
            slug,
            description,
            price,
            stock,
            unit,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return await getProductById(id);
};

const deleteProduct = async (id) => {
    const [result] = await db.query(
        "DELETE FROM products WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};