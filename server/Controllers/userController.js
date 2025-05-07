const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Order = require('../Models/orderModel');
const { verifyToken } = require('../middleWare/middle'); // Import the verifyToken function

const createNewUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        const token = generateToken(req.body.name, req.body.email, req.body.password);
        res.status(201).json({
            message: 'User created successfully',
            token: token,
            user: newUser
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

const generateToken = (name, email, password) => {
    const payload = { name, email, password };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
};

const getUserByPassword = async (req, res) => {
    try {
        const user = await User.findOne({ password: req.params.password });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = generateToken(user.name, user.email, user.password);
        res.status(200).json({ message: 'User fetched successfully', token: token, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE: מחיקת משתמש לפי סיסמה
const deleteUsers = async (req, res) => {
    try {
        const password = req.params.password;
        const deleteUser = await User.findOneAndDelete({ password });

        if (!deleteUser) {
            return res.status(400).json({ message: `User with password ${password} not found` });
        }

        res.status(200).json({ message: `User with password ${password} was deleted`, user: deleteUser });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete user", error: err });
    }
};

const updateUserByPassword = async (req, res) => {
    try {
        const { name, phone, mail, isAdmin } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { password: req.params.password },
            { name, phone, mail, isAdmin },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.log('Error during update:', error);
        res.status(500).json({
            message: "Failed to update user",
            error: error.message
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "User not authenticated" });

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decodedToken = verifyToken(token);
        if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });

        const password = decodedToken.password;
        if (!password) return res.status(400).json({ message: 'Password not found in token' });

        const user = await User.findOne({ password: password });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const orders = await Order.find({ userId: user._id });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

module.exports = { createNewUser, getAllUsers, deleteUsers, updateUserByPassword, getUserByPassword, getCurrentUser, generateToken, getUserOrders };
