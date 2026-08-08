const categoryService = require("../services/categoryService");

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        });
    }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            category
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch category"
        });
    }
};

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create category"
        });
    }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update category"
        });
    }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const deleted = await categoryService.deleteCategory(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete category"
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};