const { Op } = require('sequelize');
const JobOffering = require('../models/jobModel');
const ErrorResponse = require("../utils/errorResponse");



// Get all job offerings
exports.getAllJobOfferings = async (req, res, next) => {
    try {
        // Enable search
        const keyword = req.query.keyword
            ? {
                  title: {
                      [Op.iLike]: `%${req.query.keyword}%`,
                  },
              }
            : {};

        // Enable pagination
        const jobPerPage = 10;
        const page = Number(req.query.pageNumber) || 1;

        if (page < 1 || !Number.isInteger(page)) {
            throw new ErrorResponse("Invalid page number", 400);
        }

        // Calculate the offset for pagination
        const offset = (page - 1) * jobPerPage;

        // Find job offerings with pagination and search options
        const jobOfferings = await JobOffering.findAll({
            where: { ...keyword },
            offset: offset,
            limit: jobPerPage,
            attributes: { exclude: ['user_id'] },
        });

    

        // Get the total count for calculating total pages
        const count = await JobOffering.count({ where: { ...keyword } });

        res.status(200).json({
            success: true,
            jobOfferings,
            page,
            pages: Math.ceil(count / jobPerPage),
        });
    } catch (error) {
        next(error);
    }
};



// Get a single job offering by ID
exports.getJobOfferingById = async (req, res, next) => {
    try {
        const jobOffering = await JobOffering.findByPk(req.params.id);
            res.status(200).json({
                success: true,
                jobOffering
             })
    } catch (error) {
        next(error);
    }
};



// Create a new job offering
exports.createJobOffering = async (req, res, next) => {
    try {
        const newJobOffering = await JobOffering.create({
            user_id: req.user.user_id,
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            qualifications: req.body.qualifications,
            available: req.body.available,
            
            
            
        });
        res.status(201).json({
            success: true,
            newJobOffering
        })
    } catch(error){
        next(error);
    }
};



// Update an existing job offering by id
exports.updateJobOffering = async (req, res, next) => {
    
    try {
        const Job = await JobOffering.findByPk(req.params.id);

        if (!Job) {
            throw new ErrorResponse('Job not found', 404);
        };

        const updatedJob = await Job.update(req.body, { new: true });

        res.status(200).json({
            success: true,
            data: {
               updatedJob,
            },
        });
    
    } catch (error) {
        next(error);
    };
};


// Delete a job offering
exports.deleteJobOffering = async (req, res, next) => {
    try {
        
        const job= await JobOffering.findByPk(req.params.id);

        await job.destroy();

        res.status(200).json({
            success: true,
            message: "Job deleted",
        });
    } catch (error) {
        next(error);
    };
    
};
