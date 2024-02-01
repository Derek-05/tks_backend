const express = require('express');
const {getAllJobOfferings, getJobOfferingById, createJobOffering, updateJobOffering, deleteJobOffering, } = require('../controllers/jobControllers');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// /api/allJobs
router.get('/allJobs', isAuthenticated, isAdmin,  getAllJobOfferings );

// /api/job/:id
router.get('/job/:id',isAuthenticated,getJobOfferingById);

// /api/createJob
router.post('/createJob',isAuthenticated, isAdmin, createJobOffering);

// /api/updateJob/:id
router.put('/updateJob/:id', isAuthenticated, isAdmin, updateJobOffering);

// /api/deleteJob/:id
router.delete('/deleteJob/:id',isAuthenticated, isAdmin, deleteJobOffering);

module.exports = router;
