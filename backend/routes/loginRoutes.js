const express = require('express');
const router = express.Router();

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
dotenv.config({ path: "config.env" });

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid User Credentials', success: false });

        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (!isAuthenticated) return res.status(401).json({ error: "Incorrect username or password", success: false });

        const createToken = (_id) => {
            return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
        };

        const token = createToken(user._id.toString());
        const _id = user._id;

        return res.status(200).json({ data: { _id, token }, success: true });
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred while logging in: " + error.message, success: false });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, username, email, password, phNo } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered', success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            phNo,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            data: { _id: savedUser._id, username: savedUser.username, email: savedUser.email },
            success: true
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error: ' + error.message, success: false });
    }
});

module.exports = router;