const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.Dev_DB_NAME,
  process.env.Dev_DB_USERNAME,
  process.env.Dev_DB_PASSWORD,
  {
    host: process.env.Dev_DB_HOST,
    dialect: process.env.Dev_DB_DIALECT,
  }
);

module.exports = sequelize;