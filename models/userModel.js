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

    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: {
                msg: "First Name is required"
            },
            len: {
                args: [1, 20],
                msg: "First Name must be between 1 and 15 characters"
            },
        },
    },
    
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: {
                msg: "Last Name is required"
            },
            len: {
                args: [1, 20],
                msg: "Last Name must be between 1 and 15 characters"
            },
        },
    },

    email:{
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
            validate: {
                notNull: { msg: "Email is required" },
                is:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
        unique: true,
        
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
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

Users.belongsTo(Role, { foreignKey: 'roleId' }); // Each user belongs to one role
Role.hasMany( Users, { foreignKey: 'roleId' }); // Each role can have many users


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
    dotenv.config()
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