const express = require('express');
const router = express.Router();
const UserService = require('./user.service');
const User = require('./user.model');

router.post('/user', async (req, res) => {
    try {
        const userId = await UserService.createUser(req.body, req);
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add other routes as needed

module.exports = router;
