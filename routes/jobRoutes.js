const express = require('express');
const {getAllJobOfferings, getJobOfferingById, createJobOffering, updateJobOffering, deleteJobOffering, } = require('../controllers/jobControllers');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// /api/allJobs
router.get('/',  getAllJobOfferings );

// /api/job/:id
router.get('/jobs/:id',getJobOfferingById);

// /api/createJob
router.post('/jobs:id', createJobOffering);

// /api/updateJob/:id
router.put('/jobs:id', updateJobOffering);

// /api/deleteJob/:id
router.delete('/jobs:id', deleteJobOffering);

module.exports = router;
