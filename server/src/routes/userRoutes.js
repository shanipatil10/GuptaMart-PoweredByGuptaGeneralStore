// CHANGE NEEDED: Protect all user routes. Add/export requireAdmin and
// requireOwnerOrAdmin before enabling these examples.
// const verifyToken = require("../middleware/authMiddleware");
// const { requireAdmin, requireOwnerOrAdmin } = require("../middleware/authMiddleware");
// router.get("/", verifyToken, requireAdmin, getUsers);
// router.get("/:id", verifyToken, requireOwnerOrAdmin, getUserById);
// router.post("/", verifyToken, createUser);
// router.put("/:id", verifyToken, requireOwnerOrAdmin, updateUser);
// router.delete("/:id", verifyToken, requireOwnerOrAdmin, deleteUser);
// Also restrict role changes to admins; a user must not promote themselves.
// Keep POST disabled until createUser derives firebase_uid from req.user.uid.
const express = require("express");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;