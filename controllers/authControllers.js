const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


//Crear la cuenta
exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({ where:{email}});
    if (userExist){
        return next (new ErrorResponse("Email already registered", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
};

//Log In
exports.signin = async (req, res, next) => {
    
    try {
        const {email, password} = req.body;
   
    if (!email){
        return next (new ErrorResponse("Please add an email", 400));
    };

    if (!password){
        return next (new ErrorResponse("Please add a password", 400));
    };

    //validate email
    const user = await User.findOne({ where:{email}});
    if (!user){
        return next (new ErrorResponse("Invalid credentials", 400));
    };

    //validate password
    const isMatched = await user.comparePassword(password);
    if (!isMatched){
        return next (new ErrorResponse("Invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);


    } catch (error) {
        next(error);
    }
};

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
        res.status(codeStatus)
            .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            .json({ success: true, token, user });
   
};

//log out
exports.logout =(req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    });

};

//user profile
exports.userProfile = async (req, res, next) => {
    try {
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

