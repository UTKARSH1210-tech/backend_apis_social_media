const express = require('express');
const router = express.Router();
const { User, Follow } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where, Op } = require('sequelize');
// const auth = require('../middlewares/auth');

// Create User
router.post('/signup', async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, mobile, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Protected routes
router.put('/:id', async (req, res) => {
    try {
        const { name, mobile, email } = req.body;
        const user = await User.update({ name, mobile, email }, { where: { userId: req.params.id } });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({ where: { userId: req.params.id } });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name)
        const users = await User.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
        // const users = await User.findAll({ where: { name: name } })
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search users' });
    }
});


router.post('/follow', async (req, res) => {
    try {
        const { userId, userIdToFollow } = req.body;
        console.log(userId, userIdToFollow)
        // const { userId } = req; // Assumes authMiddleware sets req.userId
        if (userId === userIdToFollow) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }
        const follow = await Follow.create({ followerId: userId, followeeId: userIdToFollow });
        res.status(201).json(follow);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;
