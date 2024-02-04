const User = require('../models/userModel');

const ErrorResponse = require('../utils/errorResponse');


//show all users
exports.allUsers = async (req, res, next) => {
    try {
        // Enable pagination
        const usersPerPage = 10;

        // Validate page number
        const page = Number(req.query.pageNumber) || 1;

        if (page < 1 || !Number.isInteger(page)) {
            throw new ErrorResponse('Invalid page number', 400);
        }

        const count = await User.count();
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']],
            offset: usersPerPage * (page - 1),
            limit: usersPerPage,
        });

        res.status(200).json({
            success: true,
            data: {
                users,
                page,
                pages: Math.ceil(count / usersPerPage),
            },
        });
    } catch (error) {
        console.error(error);
        next(error instanceof ErrorResponse ? error : new ErrorResponse('Internal Server Error', 500));
    }
};


//show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            throw new ErrorResponse('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        next(error instanceof ErrorResponse ? error : new ErrorResponse('Internal Server Error', 500));
    }
};

//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            throw new ErrorResponse('User not found', 404);
        }

        const updatedUser = await user.update(req.body, { new: true });

        res.status(200).json({
            success: true,
            data: {
                updatedUser,
            },
        });
    
    
    } catch (error) {
        next(error instanceof ErrorResponse ? error : new ErrorResponse('Internal Server Error', 500));
    }
};

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        // Find the user by primary key
        const user = await User.findByPk(req.params.id);

        await user.destroy();

       res.status(200).json({
            success: true,
            message: "User deleted",
        });
    } catch (error) {
        next(error instanceof ErrorResponse ? error : new ErrorResponse('Internal Server Error', 500));
    }
};

