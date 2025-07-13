const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// // ✅ Get User Details Route
// router.get("/user", authenticateToken, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.userId).select("-password");
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching user details", error: error.message });
//     }
//   });

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // ✅ Create user directly (password hashing happens in User.js)
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username or password" });

        // ✅ Compare passwords using model method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

module.exports = router;
