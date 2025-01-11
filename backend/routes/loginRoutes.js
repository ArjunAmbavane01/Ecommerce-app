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
        
        return res.status(200).json({
            data: { _id: user._id, token, name: user.name, username: user.username, phNo:user.phNo, email:user.email },
            success: true
        });
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

router.post('/validateToken', async (req, res) => {
    try {
        const authHeader = req.headers.authorization; 

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user_id = decoded._id;
        const user = await User.findById(user_id);

        if (user) {
            return res.status(200).json({ data: user, success: true });
        } else {
            return res.status(200).json({ message: 'User not found', success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Invalid token or error occurred', error: error.message });
    }
});

router.put("/update-profile", async (req, res) => {
    try {
        const { userId, name, email, phNo, currentPassword, newPassword } = req.body;

        // Find user and check if exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Check if email is already taken by another user
        if (email !== user.email) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already registered', success: false });
            }
        }

        // Verify current password if user wants to change password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Current password is required', success: false });
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Current password is incorrect', success: false });
            }
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
        }

        // Update other fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phNo = phNo || user.phNo;

        const updatedUser = await user.save();

        return res.status(200).json({
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phNo: updatedUser.phNo
            },
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        return res.status(500).json({ 
            error: 'Internal server error: ' + error.message, 
            success: false 
        });
    }
});

module.exports = router;