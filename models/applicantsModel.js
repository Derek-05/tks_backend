const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");


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
        required: [true, 'email is required'],
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

    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Job ID is required" }
        }
    }
});

sequelize.sync().then(() => {
    console.log('applicants table has been created!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = Applicants;