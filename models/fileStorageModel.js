// Assuming you have a Sequelize model for storing files named FileStorage

// Import Sequelize and database connection
const { DataTypes } = require('sequelize');
const sequelize = require("../database/db"); // Assuming you have a database configuration file
const Applicants = require('../models/applicantsModel');

// Define the FileStorage model
const FileStorage = sequelize.define('fileStorage', {
  
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  fileSize: { // New field for file size
    type: DataTypes.INTEGER, // Assuming file size is stored as an integer representing bytes
    allowNull: false
  },
  
  data: {
    type: DataTypes.BLOB('long'), // Assuming file content is stored as a BLOB (binary large object)
    allowNull: false
  }
});

// Synchronize the FileStorage model with the database


FileStorage.belongsTo(Applicants, { foreignKey: 'applicant_id' });
Applicants.hasMany(FileStorage, { foreignKey: 'id' });



// Export the model
module.exports = FileStorage;
