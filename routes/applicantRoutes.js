const express = require("express");
const { getAllApplicants, getApplicantsById, createApplicants, updateApplicants, deleteApplicants } = require("../controllers/applicantsControllers");
const {isAuthenticated, isAdmin} = require("../middleware/auth")
const router = express.Router();

//applicant routes

// /api/allApplicants
router.get('/allApplicants', isAuthenticated, isAdmin,  getAllApplicants );

// /api/getApplicants/:id
router.get('/getApplicants/:id', isAuthenticated, isAdmin, getApplicantsById);

// /api/createApplicant
router.post('/create/applicant', isAuthenticated, createApplicants);

// /api/updateApplicants/:id
router.put('/updateApplicants/:id', isAuthenticated, updateApplicants);

// /api/
router.delete('/deleteApplicants/:id', isAuthenticated, isAdmin, deleteApplicants)

module.exports= router;
