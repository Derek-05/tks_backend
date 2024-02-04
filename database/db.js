//db connection using postgres

const  Sequelize = require('sequelize')
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.Dev_DB_NAME, process.env.Dev_DB_USERNAME, process.env.Dev_DB_PASSWORD, {
    host: process.env.Dev_DB_HOST,
    dialect: process.env.Dev_DB_DIALECT
});


  
  
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;