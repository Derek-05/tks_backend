// Import Sequelize DataTypes and database connection
const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");

// Define the Role model
const Role = sequelize.define('role', {
    // Define roleId column
    roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Define name column
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

// Ensure default roles are present
Role.ensureDefaultRoles = async function() {
    // Define default roles
    const defaultRoles = ['admin', 'applicant'];
    try {
        // Create or find each default role
        await Promise.all(defaultRoles.map(async (roleName) => {
            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName }
            });
            // Log if a new role is created
            if (created) {
                console.log(`Created role: ${roleName}`);
            }
        }));
    } catch (error) {
        console.error('Error ensuring default roles:', error);
    }
};

// Export the Role model
module.exports = Role;
