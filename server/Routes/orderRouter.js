const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const { verifyToken } = require('../middleWare/middle'); // Import the verifyToken function

// Middleware to check token for protected routes
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decodedToken = verifyToken(token);
    if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });

    req.user = decodedToken; // Attach the decoded token to the request
    next();
};

// Public routes
router.get('/getOrderByPhone/:phone', orderController.getOrderByPhone);
router.delete('/deleteOrders/:phone',  orderController.deleteOrders);

// Protected routes
router.post('/createNewOrder', authenticate, orderController.createNewOrder);
router.get('/getAllOrders',orderController.getAllOrders);
router.get('/getOrdersByUserPassword/:phone', authenticate, orderController.getOrdersByUserPassword);

module.exports = router;
