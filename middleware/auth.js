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
    // Check if the user object exists in the request and contains a roleId
    if (!req.user || !req.user.roleId) {
        // If roleId is missing, user is not authenticated or role not assigned
        return next(new ErrorResponse('Unauthorized', 401));
    }

    // Assuming admin role ID is 2
    const adminRoleId = 2;

    // Check if the user's roleId matches the admin role ID
    if (req.user.roleId !== adminRoleId) {
        // If not an admin, return error response
        return next(new ErrorResponse('Access denied. You must be an admin.', 403));
    }

    // If user is an admin, allow the request to proceed
    next();
};


