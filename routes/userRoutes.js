const express = require("express");
const { allUsers, singleUser, editUser, deleteUser } = require("../controllers/userController");
const {isAuthenticated, isAdmin} = require('../middleware/auth');



const router = express.Router();


//user routes

// /api/allusers
router.get('/allusers',isAuthenticated, isAdmin, allUsers);

// /api/singleuser/:id
router.get('/singleuser/:id',isAuthenticated, isAdmin, singleUser);

// /api/edituser/:id
router.put('/edituser/:id',isAuthenticated, editUser);

// /api/admin/user/delete/:id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin,deleteUser);

module.exports= router;