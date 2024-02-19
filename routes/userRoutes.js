const express = require("express");
const { allUsers, singleUser, editUser, deleteUser } = require("../controllers/userController");
const {isAuthenticated, isAdmin} = require('../middleware/auth');
const router = express.Router();

//user routes

// /api/allusers  //Recibe todos los usuarios
router.get('/allusers', allUsers);

// /api/singleuser/:id //Recibe los usuarios por id
router.get('/singleuser/:id',isAuthenticated, isAdmin, singleUser);

// /api/edituser/:id //Edita los usuarios por id
router.put('/edituser/:id',isAuthenticated, editUser);

// /api/admin/user/delete/:id //Borra los usuarios por id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin,deleteUser);

module.exports= router;