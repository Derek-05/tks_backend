const express = require("express");
const { getAllApplicants, getApplicantsById, createApplicants, updateApplicants, deleteApplicants, getApplicantPdfUploads } = require("../controllers/applicantsControllers");
const {isAuthenticated, isAdmin} = require("../middleware/auth")
const router = express.Router();

//applicant routes

// /api/allApplicants
router.get('/allApplicants', getAllApplicants );

// /api/getApplicants/:id
router.get('/getApplicants/:id', isAuthenticated, isAdmin, getApplicantsById);

// /api/uploads
router.get('/uploads', getApplicantPdfUploads)

// Removed 'isAuthenticated' middleware from this route to allow unauthenticated access
router.post('/create/applicant', createApplicants);

// /api/updateApplicants/:id
router.put('/updateApplicants/:id', isAuthenticated, updateApplicants);

// /api/deleteApplicants/:id
router.delete('/deleteApplicants/:id', isAuthenticated, isAdmin, deleteApplicants)

module.exports= router;
