const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
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
router.get('/getAllUsers', userController.getAllUsers);
router.post('/createNewUser', userController.createNewUser);
router.get('/getUserByPassword/:password', userController.getUserByPassword);
router.delete('/deleteUsers/:password', userController.deleteUsers);

// Protected routes

router.put('/updateUserByPassword/:password', authenticate, userController.updateUserByPassword);
router.get('/getCurrentUser', authenticate, userController.getCurrentUser);
router.get('/getUserOrders', authenticate, userController.getUserOrders);

module.exports = router;
