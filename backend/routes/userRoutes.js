const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 

const requireAuth = require('../middleware/reqAuth'); 
router.use(requireAuth);

router.get('/getUserDetails', async (req, res) => {
    try {
        const user_id = req.id; 

        const user = await User.findById(user_id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/getUserPartialDetails', async (req, res) => {
    try {
        const user_id = req.id; 

        const user = await User.findById(user_id, 'username email phNo'); 

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
