const mongoose = require('mongoose');
const Order = require('../Models/orderModel');
const User = require('../Models/userModel');
const { verifyToken } = require('../middleWare/middle'); // Import the verifyToken function

const createNewOrder = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decodedToken = verifyToken(token);
        if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });

        const userId = decodedToken._id;

        const newOrder = new Order({
            ...req.body,
            userId: userId
        });
        // user.orders.push(newOrder.userId);

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE: מחיקת הזמנה לפי מס טלפון
const deleteOrders = async (req, res) => {
    try {
        const phone = req.params.phone;
        const deleteOrder = await Order.findOneAndDelete({ phone });

        if (!deleteOrder) {
            return res.status(400).json({ message: `Order with phone ${phone} not found` });
        }

        res.status(200).json({ message: `Order with phone ${phone} was deleted`, order: deleteOrder });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete order", error: err });
    }
};

const getOrderByPhone = async (req, res) => {
    try {
        const phone = req.params.phone;
        const orders = await Order.find({ phone });
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this phone number" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};

const findUserByPassword = async (password) => {
    try {
        const user = await User.findOne({ password: password });
        return user;
    } catch (error) {
        throw new Error('Error finding user by password');
    }
};

const getOrdersByUserPassword = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decodedToken = verifyToken(token);
        if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });

        const password = decodedToken.password;
        if (!password) return res.status(400).json({ message: 'Password not found in token' });

        const user = await findUserByPassword(password);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const orders = await Order.find({ userId: user._id });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

module.exports = { createNewOrder, getAllOrders, deleteOrders, getOrdersByUserPassword, getOrderByPhone };
