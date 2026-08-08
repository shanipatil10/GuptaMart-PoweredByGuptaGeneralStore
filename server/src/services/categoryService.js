const db = require("../config/db");

// GET ALL CATEGORIES
const getAllCategories = async () => {
    const [rows] = await db.query(
        "SELECT * FROM categories ORDER BY id ASC"
    );

    return rows;
};

// GET CATEGORY BY ID
const getCategoryById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM categories WHERE id = ?",
        [id]
    );

    return rows[0];
};

// CREATE CATEGORY
const createCategory = async (categoryData) => {
    const {
        name,
        slug,
        image_url
    } = categoryData;

    const [result] = await db.query(
        `INSERT INTO categories
        (name, slug, image_url)
        VALUES (?, ?, ?)`,
        [
            name,
            slug,
            image_url || null
        ]
    );

    return await getCategoryById(result.insertId);
};

// UPDATE CATEGORY
const updateCategory = async (id, categoryData) => {
    const {
        name,
        slug,
        image_url
    } = categoryData;

    const [result] = await db.query(
        `UPDATE categories
         SET name = ?,
             slug = ?,
             image_url = ?
         WHERE id = ?`,
        [
            name,
            slug,
            image_url || null,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return await getCategoryById(id);
};

// DELETE CATEGORY
const deleteCategory = async (id) => {
    const [result] = await db.query(
        "DELETE FROM categories WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};