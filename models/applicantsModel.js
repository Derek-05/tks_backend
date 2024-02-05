const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const Users = require("../models/userModel");
const JobOffering = require("../models/jobModel");

const Applicants = sequelize.define('applicants', {
    applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: {
                msg: "First Name is required"
            },
            len: {
                args: [1, 20],
                msg: "First Name must be between 1 and 20 characters"
            },
        },
    },
    
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: {
                msg: "Last Name is required"
            },
            len: {
                args: [1, 20],
                msg: "Last Name must be between 1 and 15 characters"
            },
        },
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
        defaultValue: 1
    },
    file_type: {
        type: DataTypes.STRING,
    },
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {msg: "User ID is required"}
        },
    },
    
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            notNull: { msg: "Job ID is required" }
        }
    }
});

Applicants.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Applicants, { foreignKey: 'user_id' });

Applicants.belongsTo(JobOffering, { foreignKey: 'id' });
JobOffering.hasMany(Applicants, { foreignKey: 'id' });



// Remove sync() if you're managing migrations separately
sequelize.sync().then(() => {
    console.log('Applicants table has been created!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

module.exports = Applicants;