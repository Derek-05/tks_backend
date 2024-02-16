const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const Users = require("./userModel");
const JobOffering = require("./jobModel"); 

const Applicants = sequelize.define('applicants', {
    applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    file_name: {
        type: DataTypes.STRING
    },
    file_type: {
        type: DataTypes.STRING,
    },

    file_size: { // New field for file size
        type: DataTypes.INTEGER, // Assuming file size is stored as an integer representing bytes
        allowNull: false
      },
      
      data: {
        type: DataTypes.BLOB('long'), // Assuming file content is stored as a BLOB (binary large object)
        allowNull: false
      },
    
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, 
            key: 'user_id', 
        },
        validate: {
            notNull: { msg: "User ID is required" }
        }
    },
    
    job_offering_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: JobOffering,
            key: 'id',
        },
        validate: {
            notNull: { msg: "Job Offering ID is required" }
        }
    }
});


Applicants.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Applicants, { foreignKey: 'user_id' });

Applicants.belongsTo(JobOffering, { foreignKey: 'job_offering_id' });
JobOffering.hasMany(Applicants, { foreignKey: 'job_offering_id' });

module.exports = Applicants;
