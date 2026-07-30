import Company from "../models/Company.js";

/*
========================================
Create Company
POST /api/company
Private (Company)
========================================
*/

export const createCompany = async(req, res) => {
    try {
        const {
            companyName,
            email,
            website,
            description,
            industry,
            companySize,
            location,
            foundedYear,
        } = req.body;

        // Check existing company
        const existingCompany = await Company.findOne({ email });

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "Company already exists",
            });
        }
        // Get uploaded logo
        const logo = req.file ? req.file.path : "";
        // Create company
        const company = await Company.create({
            companyName,
            email,
            website,
            logo,
            description,
            industry,
            companySize,
            location,
            foundedYear,
            owner: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            company,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
========================================
Get Company Profile
GET /api/company/profile
Private (Company)
========================================
*/

export const getCompanyProfile = async(req, res) => {
    try {
        const company = await Company.findOne({
            owner: req.user.id,
        }).populate("owner", "name email role");

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            company,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Update Company Profile
PUT /api/company/profile
Private (Company)
========================================
*/

export const updateCompany = async(req, res) => {
    try {

        const company = await Company.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        company.companyName = req.body.companyName || company.companyName;
        company.email = req.body.email || company.email;
        company.website = req.body.website || company.website;
        company.description = req.body.description || company.description;
        company.industry = req.body.industry || company.industry;
        company.companySize = req.body.companySize || company.companySize;
        company.location = req.body.location || company.location;
        company.foundedYear = req.body.foundedYear || company.foundedYear;

        // Update logo if new file uploaded
        if (req.file) {
            company.logo = req.file.path;
        }

        await company.save();

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
========================================
Get All Companies
GET /api/company
Public
========================================
*/

export const getAllCompanies = async(req, res) => {
    try {
        const companies = await Company.find().populate(
            "owner",
            "name email"
        );

        return res.status(200).json({
            success: true,
            count: companies.length,
            companies,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
========================================
Delete Company
DELETE /api/company/profile
Private (Company)
========================================
*/

export const deleteCompany = async(req, res) => {
    try {
        const company = await Company.findOne({
            owner: req.user.id,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        await Company.findByIdAndDelete(company._id);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};