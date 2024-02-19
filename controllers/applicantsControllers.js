const Applicants = require('../models/applicantsModel');
const userService = require('../services/userServices');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const fs = require('fs').promises;

// @desc    Get all applicants
// @route   GET /api/applicants
// @access  Public
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

// @desc    Get a single applicant by id
// @route   GET /api/applicants/:id
// @access  Public
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

// @desc    Update an existing applicant by id
// @route   PUT /api/applicants/:id
// @access  Private
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

// @desc    Delete an applicant by id
// @route   DELETE /api/applicants/:id
// @access  Private
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

// @desc    Create a new applicant
// @route   POST /api/applicants
// @access  Private
exports.createApplicants = async (req, res, next) => {
    try {
        // Get or create the user
        const user = await userService.ensureApplicantUser(req.body);

        // Extract the file from the request
        const file = req.file;

        if (!file) {
            throw new ErrorResponse('No file uploaded', 400);
        }

        // Include all fields from req.body.applicant_info
        const applicantData = {
            user_id: user.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            job_offering_id: req.body.job_offering_id,
            file_name: file.originalname,
            file_type: file.mimetype,
            file_size: file.file_size,
        };

        // Save applicant data to database
        const newApplicant = await Applicants.create(applicantData);

        res.status(201).json({
            success: true,
            data: newApplicant,
        });
    } catch (error) {
        console.error('Error creating applicant:', error);
        next(error);
    }
};

// @desc    Get PDF uploads in the uploads folder
// @route   GET /api/uploads
// @access  Public
exports.getApplicantPdfUploads = async (req, res, next) => {
    try {
        // Construct the path to the directory where PDF uploads are stored
        const uploadsFolderPath = path.join(__dirname, '..', 'uploads');

        // Read the files from the directory
        const files = await fs.readdir(uploadsFolderPath);

        // Decode filenames to handle special characters or spaces
        const decodedFiles = files.map(file => decodeURIComponent(file));

        // Map each PDF file to an object containing its original name and path
        const pdfFiles = decodedFiles
            .filter(file => path.extname(file).toLowerCase() === '.pdf')
            .map(file => ({
                originalName: file,
                path: path.join(uploadsFolderPath, file)
            }));

        // Send the list of PDF files as a response
        res.status(200).json({ success: true, pdfFiles });
    } catch (error) {
        console.error('Error fetching PDF uploads:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
