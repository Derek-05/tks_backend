//Middleware for user authentication
const ErrorResponse = require('../utils/errorResponse');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

//check is user is authenticated

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, error: 'Invalid or expired token. Please log in again.' });
    }

    try {
        // Verify token
        const decoded = JWT.verify(token, 'THEBIGSECRET');
        req.user = await User.findByPk(decoded.user);

        if (!req.user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(401).json({ success: false, error: 'Invalid or expired token. Please log in again.' });
    }
};


// Middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.roleId === 1) {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};


