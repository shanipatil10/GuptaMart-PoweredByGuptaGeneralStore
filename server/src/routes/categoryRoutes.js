const express = require("express");

const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// CHANGE NEEDED: Keep category reads public; require a verified admin for writes.
// Add/export requireAdmin from authMiddleware before enabling these examples.
// const verifyToken = require("../middleware/authMiddleware");
// const { requireAdmin } = require("../middleware/authMiddleware");
// router.post("/", verifyToken, requireAdmin, createCategory);
// router.put("/:id", verifyToken, requireAdmin, updateCategory);
// router.delete("/:id", verifyToken, requireAdmin, deleteCategory);

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;