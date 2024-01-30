const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const User = require("../models/userModel");
const JobOffering = require("../models/jobModel");

const Applicants = sequelize.define('applicants', {
    applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first_name:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    
    last_name:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },

    email:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'email is required'],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Phone Number is required" },
            is: /^\+?\d{7,}$/ // Example validation for phone number format
        }
    },
    file_name: {
        type: DataTypes.STRING,
        defaultValue: null // Adjust the default value as needed
    },
    file_type: {
        type: DataTypes.STRING,
    },
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "User ID is required" }
        }
    },
    
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            notNull: { msg: "Job ID is required" }
        }
    }
});

Applicants.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Applicants, { foreignKey: 'user_id' });

Applicants.belongsTo(JobOffering, { foreignKey: 'id' });
JobOffering.hasMany(Applicants, { foreignKey: 'id' });



// Remove sync() if you're managing migrations separately
sequelize.sync().then(() => {
    console.log('Applicants table has been created!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

module.exports = Applicants;
