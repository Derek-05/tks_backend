const { DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');


 const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
       
    },

    first_name:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    
    last_name:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
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

    password:{
        type: DataTypes.STRING,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) characters'],
    },
    
    //for the role we are identifying the user as 0 and the admin as 1

    role:{
        type: DataTypes.STRING,
        defaultValue:"user",
        allowNull: false,
    },

   
    });  

    //Encrypting password before saving
    Users.beforeCreate(async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    });

    //Comparing password to see if user was already created
    Users.prototype.comparePassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };

    //Return the JWT Token
    Users.prototype.getJwtToken = function () {
        return JWT.sign({ user: this.user_id }, 'THEBIGSECRET', {
            expiresIn: 3600,
        });
    };

    
  
  sequelize.sync().then(() => {
    console.log('users table has been created!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
  
 module.exports = Users;
