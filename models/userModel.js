const {DataTypes} = require('sequelize');
const sequelize = require("../database/db");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const Role = require('../models/roleModel');
const dotenv = require('dotenv')


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

    phone_number: {
        type: DataTypes.STRING,
        allowNull: true, 
        validate: {
            is: /^\+?\d{7,}$/ 
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            len: {
                args: [6],
                msg: "Password must have at least 6 characters"
            },
        },
    },
    

    roleId:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
            notNull: { msg: "Role ID is required" }
        }
    }

    
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

    //updated to use the role name instead of the roleId, else null
    Users.prototype.getJwtToken = async function () {
        const role = await Role.findByPk(this.roleId);
        return JWT.sign({ user: this.user_id, role: role ? role.name : null }, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });
    };
  
 module.exports = Users;