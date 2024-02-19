// Import Sequelize DataTypes and database connection
const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");

// Import related models
const Users = require("./userModel");
const JobOffering = require("./jobModel");

// Define the Applicants model
const Applicants = sequelize.define('applicants', {
    // Define applicant_id column
    applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Define user_id column
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Reference to the Users model
            key: 'user_id', // Column to reference in the Users model
        },
        validate: {
            notNull: { msg: "User ID is required" }
        }
    },
    // Define job_offering_id column
    job_offering_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: JobOffering, // Reference to the JobOffering model
            key: 'id', // Column to reference in the JobOffering model
        },
        validate: {
            notNull: { msg: "Job Offering ID is required" }
        }
    },
    // Define file_name column
    file_name: {
        type: DataTypes.STRING
    },
    // Define file_type column
    file_type: {
        type: DataTypes.STRING
    },
    // Define file_size column
    file_size: {
        type: DataTypes.INTEGER
    },
});

// Define associations between models
Applicants.belongsTo(Users, { foreignKey: 'user_id' }); // Define a many-to-one relationship between Users and Applicants
Users.hasMany(Applicants, { foreignKey: 'user_id' }); // Define a one-to-many relationship between Users and Applicants

Applicants.belongsTo(JobOffering, { foreignKey: 'job_offering_id' }); // Define a many-to-one relationship between JobOffering and Applicants
JobOffering.hasMany(Applicants, { foreignKey: 'job_offering_id' }); // Define a one-to-many relationship between JobOffering and Applicants

// Export the Applicants model
module.exports = Applicants;
