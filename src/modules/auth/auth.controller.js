const { validationResult } = require('express-validator');
const AuthService = require('./auth.service');

async function login (req, res) {
    try {
        const { email, password } = req.body;
        const token = await AuthService.signIn(email, password);
        res.status(200).json({ accessToken: token });
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (error.response?.status !== 200) {
            return res.status(500).json({ message: 'Unknown error' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function register (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, name, password } = req.body;
        await AuthService.signUp({ email, name, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.response?.status === 409) {
            return res.status(409).json({message: 'User already exists'});
        }
        if (error.response?.status !== 200) {
            return res.status(500).json({message: 'Unknown error'});
        }
        res.stat
    }
}

module.exports = {login, register};