const Applicants = require('../models/applicantsModel');
const ErrorResponse = require("../utils/errorResponse");

// Get all applicants
exports.getAllApplicants = async (req, res, next) => {
    try {
        const applicants = await Applicants.findAll();

        res.status(200).json({
            success: true,
            applicants
            });
    
        } catch (error) {
        next(error);
    }
};


//Get a single applicant by id
exports.getApplicantsById = async (req, res, next) => {
    try {
        const applicant = await Applicants.findByPk(req.params.id);
            res.status(200).json({
                success: true,
                data: {
                    applicant,
                },
             })
    } catch (error) {
        next(error);
    }
};



//Create an applicant
exports.createApplicants = async (req, res, next) => {
    try {
        const newApplicant = await Applicants.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            id: req.body.id,
            user_id: req.user.user_id,
            file_name: req.body.file_name,
            file_type: req.body.file_type,
            

            
            
        });
        res.status(201).json({
            success: true,
            newApplicant
        })
    } catch(error){
        next(error);
    }
};


// Update an existing applicant by id
exports.updateApplicants = async (req, res, next) => {
    
    try {
        const Applicant = await Applicants.findByPk(req.params.id);

        if (!Applicant) {
            throw new ErrorResponse('Applicant not found', 404);
        };

        const updatedApplicant = await Applicant.update(req.body, { new: true });

        res.status(200).json({
            success: true,
            data: {
               updatedApplicant,
            },
        });
    
    } catch (error) {
        next(error);
    };
};

//Delete an applicant by id
exports.deleteApplicants = async (req, res, next) => {
    try {
        
        const applicant= await Applicants.findByPk(req.params.id);

        await applicant.destroy();

        res.status(200).json({
            success: true,
            message: "Applicant deleted",
        });
    } catch (error) {
        next(error);
    };
    
};