// CHANGE NEEDED: Keep product reads public, but require a verified admin for writes.
// Before enabling these route changes, add/export a requireAdmin middleware; the
// current authMiddleware exports verifyToken only.
// const verifyToken = require("../middleware/authMiddleware");
// const { requireAdmin } = require("../middleware/authMiddleware");
// router.post("/", verifyToken, requireAdmin, createProduct);
// router.put("/:id", verifyToken, requireAdmin, updateProduct);
// router.delete("/:id", verifyToken, requireAdmin, deleteProduct);

const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;