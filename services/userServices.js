const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const Role = require('../models/roleModel'); 

exports.ensureApplicantUser = async (userData) => {
    let { email } = userData;
    let user = await User.findOne({ where: { email } });

    const applicantRole = await Role.findOne({ where: { name: 'applicant' } });
    if (!applicantRole) throw new ErrorResponse('Applicant role not found', 500);

    // If user does not exist, create a new user with the applicant role
    if (!user) {
        const hashedPassword = await bcrypt.hash('dummyPassword123', 10);
        user = await User.create({
            ...userData,
            password: hashedPassword,
            roleId: applicantRole.roleId
        });

    // If user exists as applicant, update the user data
    } else if (user.roleId === applicantRole.roleId) {

         // Remove password field from userData if present to avoid updating it
         const { password, ...userDataWithoutPassword } = userData;

        await user.update({ ...userDataWithoutPassword });
    }
    
    //if user exists with different role do nothing and return the user
    return user;
};