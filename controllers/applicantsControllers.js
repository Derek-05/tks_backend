const Applicants = require('../models/applicantsModel');
const userService = require('../services/userServices');
const ErrorResponse = require('../utils/errorResponse');

// Get all applicants
exports.getAllApplicants = async (req, res, next) => {
    try {
        const applicants = await Applicants.findAll();
        res.status(200).json({
            success: true,
            applicants,
        });
    } catch (error) {
        next(error);
    }
};

// Get a single applicant by id
exports.getApplicantsById = async (req, res, next) => {
    try {
        const applicant = await Applicants.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            data: {
                applicant,
            },
        });
    } catch (error) {
        next(error);
    }
};




exports.getApplicantWithFilesById = async (req, res, next) => {
    try {
        const applicantId = req.params.id;

        // Find the applicant by ID
        const applicant = await Applicants.findByPk(applicantId);

        if (!applicant) {
            return res.status(404).json({ success: false, error: 'Applicant not found' });
        }

        // Extract file-related information from the applicant
        const files = {
            file_name: applicant.file_name,
            file_type: applicant.file_type,
            file_size: applicant.file_size,
            data: applicant.data
            // Add more file-related fields as needed
        };

        // Return the file-related information for the applicant
        res.status(200).json({
            success: true,
            data: files // Return the files directly without nesting under another 'files' object
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching file-related information for applicant by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


// Update an existing applicant by id
exports.updateApplicants = async (req, res, next) => {
    try {
        const applicant = await Applicants.findByPk(req.params.id);

        if (!applicant) {
            throw new ErrorResponse('Applicant not found', 404);
        }

        const updatedApplicant = await applicant.update(req.body);

        res.status(200).json({
            success: true,
            data: {
                updatedApplicant,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Delete an applicant by id
exports.deleteApplicants = async (req, res, next) => {
    try {
        const applicant = await Applicants.findByPk(req.params.id);

        if (!applicant) {
            throw new ErrorResponse('Applicant not found', 404);
        }

        await applicant.destroy();

        res.status(200).json({
            success: true,
            message: 'Applicant deleted',
        });
    } catch (error) {
        next(error);
    }
};

// Create a new applicant
exports.createApplicants = async (req, res, next) => {
    try {
        // Get or create the user
        const user = await userService.ensureApplicantUser(req.body);

        // Include all fields from req.body.applicant_info
        const applicantData = {
            user_id: user.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            job_offering_id: req.body.job_offering_id,
            file_name: req.body.file_name,
            file_type: req.body.file_type,
            file_size: req.body.file_size,
            data:req.body.data

        
        };

        const newApplicant = await Applicants.create(applicantData);

        res.status(201).json({
            success: true,
            data: newApplicant,
        });


    } catch (error) {
        next(error);
    }
};
