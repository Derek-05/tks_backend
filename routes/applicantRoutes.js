const express = require("express");
const { getAllApplicants, getApplicantsById, createApplicants, updateApplicants, deleteApplicants } = require("../controllers/applicantsControllers");

const router = express.Router();

//applicant routes

// /api/allApplicants
router.get('/allApplicants', getAllApplicants );

// /api/getApplicants/:id
router.get('/getApplicants/:id', getApplicantsById);

// /api/createApplicant
router.post('/create/applicant', isAuthenticated, createApplicants);

// /api/updateApplicants/:id
router.put('/updateApplicants/:id', isAuthenticated, updateApplicants);

// /api/
router.delete('/deleteApplicants/:id', deleteApplicants)

module.exports= router;