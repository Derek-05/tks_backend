const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Role = sequelize.define('role', {

  roleId:{
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

module.exports = Role;