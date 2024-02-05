const {DataTypes} = require('sequelize');
const sequelize = require("../database/db");

const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

// Ensure default roles are present
Role.ensureDefaultRoles = async function() {
    const defaultRoles = ['admin', 'applicant'];
    try {
        await Promise.all(defaultRoles.map(async (roleName) => {
            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName }
            });
            if (created) {
                console.log(`Created role: ${roleName}`);
            }
        }));
    } catch (error) {
        console.error('Error ensuring default roles:', error);
    }
};

module.exports = Role;
