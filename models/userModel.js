// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const Role = require('../models/roleModel');
const dotenv = require('dotenv')

// Define the Users model
const Users = sequelize.define('users', {
    // Define user_id column
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Define first_name column
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: { msg: "First Name is required" },
            len: { args: [1, 20], msg: "First Name must be between 1 and 20 characters" }
        },
    },
    // Define last_name column
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: { msg: "Last Name is required" },
            len: { args: [1, 20], msg: "Last Name must be between 1 and 20 characters" }
        },
    },
    // Define email column
    email: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        validate: {
            notNull: { msg: "Email is required" },
            isEmail: true // Validate email format
        },
        unique: true,
    },

    //Define date of birth column
    dof:{
        type: DataTypes.DATE,
        allowNull: true
    },

    //Define gender column
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIn: [['male', 'female']], // Replace with actual values
        },
    },

    // Define phone_number column
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { is: /^\+?\d{7,}$/ } // Validate phone number format
    },
    // Define password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: { msg: "Password is required" },
            len: { args: [6], msg: "Password must have at least 6 characters" },
        },
    },
    // Define roleId column
    roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: { notNull: { msg: "Role ID is required" } }
    }
});

// Define association between Users and Role models
Users.belongsTo(Role, { foreignKey: 'roleId' }); // Each user belongs to one role
Role.hasMany(Users, { foreignKey: 'roleId' }); // Each role can have many users

// Encrypting password before saving
Users.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});

// Comparing password to verify user credentials
Users.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return the JWT Token
dotenv.config();
Users.prototype.getJwtToken = async function () {
    const role = await Role.findByPk(this.roleId);
    return JWT.sign({ user: this.user_id, roleId: this.roleId, roleName: role.name }, process.env.JWT_SECRET, {
        expiresIn: 3600,
    });
};

// Export the Users model
module.exports = Users;
