const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dialectOptions = process.env.DB_SSL === 'true'
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: process.env.DB_DIALECT || 'postgres',
      dialectOptions,
    })
  : new Sequelize(
      process.env.DB_NAME || process.env.Dev_DB_NAME,
      process.env.DB_USER || process.env.Dev_DB_USERNAME,
      process.env.DB_PASSWORD || process.env.Dev_DB_PASSWORD,
      {
        host: process.env.DB_HOST || process.env.Dev_DB_HOST,
        dialect: process.env.DB_DIALECT || process.env.Dev_DB_DIALECT,
        dialectOptions,
      }
    );

module.exports = sequelize;
