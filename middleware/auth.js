//Middleware for user authentication
const ErrorResponse = require('../utils/errorResponse');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

//check is user is authenticated

exports.isAuthenticated = async (req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies); 
    
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
exports.isAdmin = async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const role = await Role.findByPk(req.user.roleId);
    if (role && role.name === 'admin') { // Check if the user's role is admin instead of checking the roleId
        return next();
    } else {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
};

// Middleware for applicant
exports.isApplicant = async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        const role = await Role.findByPk(req.user.roleId);
        if (role && role.name === 'applicant') {
            next();
        } else {
            return next(new ErrorResponse('Access denied, you must be an applicant', 401));
        }
    } catch (error) {
        console.error('Error verifying role:', error);
        return next(new ErrorResponse('Error verifying role', 500));
    }
};
