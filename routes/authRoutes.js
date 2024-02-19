const express = require("express");
const { signup, signin, logout, userProfile } = require("../controllers/authControllers");
const {isAuthenticated} = require('../middleware/auth');
const router = express.Router();


//auth routes

// /api/signup /Crear la cuenta
router.post('/signup', signup);

// /api/signin /Login la cuenta
router.post('/signin', signin);

// /api/logout /Logout de la cuenta
router.get('/logout', logout);

// /api/me /Ver tu profile
router.get('/me',isAuthenticated, userProfile);

module.exports= router;