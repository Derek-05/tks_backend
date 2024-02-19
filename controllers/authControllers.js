const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const Role = require('../models/roleModel');

// Sign Up
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
        return next(new ErrorResponse("Email already registered", 400));
    }

    try {
        // Find the admin role
        const adminRole = await Role.findOne({ where: { name: 'admin' } });
        if (!adminRole) {
            return next(new ErrorResponse("Admin role not found", 500));
        }

        // Create user with admin role (development purposes only)
        const user = await User.create({
            ...req.body,
            roleId: adminRole.roleId,
        });

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Sign In
exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return next(new ErrorResponse("Please provide email and password", 400));
        }

        // Validate email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Validate password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Send token response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// Logout
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
};

// Get User Profile
exports.userProfile = async (req, res, next) => {
    try {
        // Find user by user_id and exclude password from response
        const user = await User.findByPk(req.user.user_id, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorResponse('Internal Server Error', 500));
    }
};

// Helper function to send token response
const sendTokenResponse = async (user, statusCode, res) => {
    const token = await user.getJwtToken();
    const filteredUserData = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        roleId: user.roleId
    };
    res.status(statusCode)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, token, filteredUserData });
};
