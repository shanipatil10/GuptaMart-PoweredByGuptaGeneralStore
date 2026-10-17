const verifyToken = require("./middleware/authMiddleware");
const express = require("express");
require("./config/firebaseAdmin");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors"); 

const app = express();

// 🛡️ 1. SECURITY MIDDLEWARES (Must be placed BEFORE routes)
// Restricts API access only to your frontend website
app.use(cors({ origin: "http://localhost:3000" })); 
// Prevents Denial of Service (DoS) attacks by blocking massive data uploads
app.use(express.json({ limit: "10kb" })); 

// 🛣️ 2. APPLICATION ROUTES
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// 🔍 3. TEST ENDPOINTS
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Gupta General Store API is running",
    });
});

app.get("/api/test-auth", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Authentication successful",
        user: req.user
    });
});

// 🚨 4. GLOBAL ERROR HANDLER (Must be placed AFTER all routes and endpoints)
// Catches crashes and hides sensitive system details from hackers
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong internally!" });
});

module.exports = app;
