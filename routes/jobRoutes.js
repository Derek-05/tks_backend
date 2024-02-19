const express = require('express');
const {getAllJobOfferings, getJobOfferingById, createJobOffering, updateJobOffering, deleteJobOffering, } = require('../controllers/jobControllers');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

const router = express.Router();

// /api/allJobs //Recibe todas las ofertas de trabajos
router.get('/allJobs', getAllJobOfferings );

// /api/job/:id  //Recibe todas las ofertas de trabajo por id
router.get('/job/:id',getJobOfferingById);

// /api/createJob //Crea la oferta de trabajo
router.post('/createJob',isAuthenticated, isAdmin, createJobOffering);

// /api/updateJob/:id  //Actualiza la oferta de trabajo
router.put('/updateJob/:id', isAuthenticated, isAdmin, updateJobOffering);

// /api/deleteJob/:id  //Borrar la oferta de trabajo
router.delete('/deleteJob/:id',isAuthenticated, isAdmin, deleteJobOffering);

module.exports = router;
