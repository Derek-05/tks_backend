const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const User = require("../models/userModel");
const JobOffering = require("../models/jobModel");

const Applicants = sequelize.define('applicants', {
    applicant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    
    first_name:{
        type:DataTypes.STRING,
        required: [true, "First Name is required"],
        maxlength: 70,
    },
    
    
    last_name:{
        type:DataTypes.STRING,
        trim: true,
        required: [true, "Last Name is required"],
    }, 
    
    
    email:{
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
            validate: {
                notNull: { msg: "email is required" },
                is:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    
    
    phone_number:{
        type:DataTypes.STRING,
        trim: true,
        required: [true, "Phone Number is required"]
    },

    file_name:{
        type:DataTypes.STRING,
        default: true,
    },
    
    
   file_type:{
        type:DataTypes.STRING,
    },
});

sequelize.sync().then(() => {
    console.log('Applicants table has been created!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});

module.exports = Applicants;
