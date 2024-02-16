const express = require("express");
const { getAllApplicants, getApplicantsById, createApplicants, updateApplicants, deleteApplicants, getApplicantWithFilesById } = require("../controllers/applicantsControllers");
const {isAuthenticated, isAdmin} = require("../middleware/auth")
const router = express.Router();

//applicant routes

// /api/allApplicants
router.get('/allApplicants', getAllApplicants );

// /api/getApplicants/:id
router.get('/getApplicants/:id', isAuthenticated, isAdmin, getApplicantsById);

// /api/getApplicantwithFile/:id
router.get('/getApplicantWithFiles/:id', isAuthenticated, isAdmin, getApplicantWithFilesById);

// Removed 'isAuthenticated' middleware from this route to allow unauthenticated access
router.post('/create/applicant', createApplicants);

// /api/updateApplicants/:id
router.put('/updateApplicants/:id', isAuthenticated, updateApplicants);

// /api/
router.delete('/deleteApplicants/:id', isAuthenticated, isAdmin, deleteApplicants)

module.exports= router;
