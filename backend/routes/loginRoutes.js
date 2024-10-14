const express = require('express');
const router = express.Router();

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
dotenv.config({ path: "config.env" });

router.post("/login", loginValidation, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid User Credentials', success: false });

        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (!isAuthenticated) return res.status(401).json({ error: "Incorrect email or password", success: false });

        // Create JWT token
        const createToken = (_id) => {
            return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
        };

        // Generate the token and send the response
        const token = createToken(user._id.toString());
        const id = user._id;

        return res.status(200).json({ data: { id, token }, success: true });
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred while logging in: " + error.message, success: false });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered', success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            data: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
            success: true
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error: ' + error.message, success: false });
    }
});

module.exports = router;