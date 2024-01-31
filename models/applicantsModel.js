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
        allowNull: false,
            validate: {
                notNull: { msg: "First Name is required" }
            },
        maxlength: 32,
    },
    
    last_name:{
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
            validate: {
                notNull: { msg: "Last Name is required" }
            },
        maxlength: 32,
    },

    email:{
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
            validate: {
                notNull: { msg: "email is required" },
                is:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
        unique: true,
        
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Phone Number is required" },
            is: /^\+?\d{7,}$/ 
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