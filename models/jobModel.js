const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const User = require("../models/userModel")
const JobOffering = sequelize.define('jobOffering', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    
    title:{
        type:DataTypes.STRING,
        required: [true, "Title is required"],
        maxlength: 70,
    },
    
    
    description:{
        type:DataTypes.STRING,
        trim: true,
        required: [true, "Description is required"],
    }, 
    
    
    salary:{
         type:DataTypes.STRING,
         trim: true,
         required: [true, "Salary is required"]
    },
    
    
    
    qualifications:{
        type:DataTypes.STRING,
        trim: true,
        required: [true, "Qualifications is required"]
    },

    available:{
        type:DataTypes.BOOLEAN,
        default: true,
    },
    
    
   applicationDeadline:{
        type:DataTypes.DATE,
    },

    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "User ID is required" }
        }
       
    },

    

    });

// Define the association

JobOffering.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(JobOffering, { foreignKey: 'user_id' });



sequelize.sync().then(() => {
    console.log('jobOffering table has been created!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = JobOffering;