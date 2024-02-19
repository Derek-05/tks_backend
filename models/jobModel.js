// Import Sequelize DataTypes and database connection
const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");

// Import User model for association
const User = require("./userModel");

// Define the JobOffering model
const JobOffering = sequelize.define('jobOffering', {
    // Define id column
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Define title column
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Title is required" }
        },
        maxlength: 70,
    },
    // Define description column
    description: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        validate: {
            notNull: { msg: "Description is required" }
        }
    },
    // Define salary column
    salary: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        validate: {
            notNull: { msg: "Salary is required" }
        }
    },
    // Define qualifications column
    qualifications: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        validate: {
            notNull: { msg: "Qualifications is required" }
        }
    },
    // Define available column
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    // Define user_id column for association
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "User ID is required" }
        }
    },
});

// Define association between models
JobOffering.belongsTo(User, { foreignKey: 'user_id' }); // Define a many-to-one relationship between User and JobOffering
User.hasMany(JobOffering, { foreignKey: 'user_id' }); // Define a one-to-many relationship between User and JobOffering

// Export the JobOffering model
module.exports = JobOffering;
