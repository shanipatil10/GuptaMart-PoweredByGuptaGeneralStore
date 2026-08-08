const db = require("../config/db");

// GET ALL USERS
const getAllUsers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM users ORDER BY id ASC"
    );

    return rows;
};

// GET USER BY ID
const getUserById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

// CREATE USER
const createUser = async (userData) => {
    const {
        firebase_uid,
        name,
        email,
        phone,
        address,
        role
    } = userData;

    const [result] = await db.query(
        `INSERT INTO users
        (firebase_uid, name, email, phone, address, role)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            firebase_uid,
            name,
            email,
            phone,
            address || null,
            role || "customer"
        ]
    );

    return await getUserById(result.insertId);
};

// UPDATE USER
const updateUser = async (id, userData) => {
    const {
        name,
        email,
        phone,
        address,
        role
    } = userData;

    const [result] = await db.query(
        `UPDATE users
         SET name = ?,
             email = ?,
             phone = ?,
             address = ?,
             role = ?
         WHERE id = ?`,
        [
            name,
            email,
            phone,
            address || null,
            role || "customer",
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return await getUserById(id);
};

// DELETE USER
const deleteUser = async (id) => {
    const [result] = await db.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};