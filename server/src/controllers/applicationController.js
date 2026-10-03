import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

// =====================================================
// APPLY JOB
// POST /api/applications/:jobId
// =====================================================
export const applyForJob = async(req, res) => {
    try {

        const { jobId } = req.params;

        const studentId = req.user.id;

        const {
            coverLetter = "",
        } = req.body;


        // -----------------------------------------------
        // Check student
        // -----------------------------------------------
        const student = await User.findById(studentId)
            .select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }


        // -----------------------------------------------
        // Check job
        // -----------------------------------------------
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }


        // -----------------------------------------------
        // Check job status
        // -----------------------------------------------
        if (
            job.status &&
            !["Open", "Active"].includes(job.status)
        ) {
            return res.status(400).json({
                success: false,
                message: "This job is no longer accepting applications.",
            });
        }


        // -----------------------------------------------
        // Check deadline
        // -----------------------------------------------
        if (job.deadline) {

            const deadline = new Date(job.deadline);

            if (deadline < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Application deadline has passed.",
                });
            }
        }


        // -----------------------------------------------
        // Resume required
        // -----------------------------------------------
        if (!student.resume) {
            return res.status(400).json({
                success: false,
                message: "Please upload your resume before applying.",
            });
        }


        // -----------------------------------------------
        // Company
        // -----------------------------------------------
        let companyId = null;

        if (job.company) {
            companyId = job.company;
        }


        // -----------------------------------------------
        // Check existing application
        // -----------------------------------------------
        const existingApplication =
            await Application.findOne({
                student: studentId,
                job: jobId,
            });


        // -----------------------------------------------
        // Existing application found
        // -----------------------------------------------
        if (existingApplication) {


            // -------------------------------------------
            // Re-apply after withdrawal
            // -------------------------------------------
            if (
                existingApplication.status ===
                "Withdrawn"
            ) {

                existingApplication.status =
                    "Pending";

                existingApplication.resume =
                    student.resume;

                existingApplication.coverLetter =
                    coverLetter;

                existingApplication.company =
                    companyId;

                await existingApplication.save();


                const reAppliedApplication =
                    await Application.findById(
                        existingApplication._id
                    )
                    .populate(
                        "job",
                        "title location salary company deadline status"
                    )
                    .populate(
                        "student",
                        "name email profileImage"
                    );


                return res.status(200).json({
                    success: true,
                    message: "Job application submitted again successfully.",
                    application: reAppliedApplication,
                });
            }


            // -------------------------------------------
            // Already applied
            // -------------------------------------------
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job.",
                application: existingApplication,
            });
        }


        // -----------------------------------------------
        // Create new application
        // -----------------------------------------------
        const application =
            await Application.create({

                student: studentId,

                job: jobId,

                company: companyId,

                resume: student.resume,

                coverLetter,

                status: "Pending",
            });


        // -----------------------------------------------
        // Populate response
        // -----------------------------------------------
        const populatedApplication =
            await Application.findById(
                application._id
            )
            .populate(
                "job",
                "title location salary company deadline status"
            )
            .populate(
                "student",
                "name email profileImage"
            );


        return res.status(201).json({

            success: true,

            message: "Job application submitted successfully.",

            application: populatedApplication,
        });


    } catch (error) {

        console.error(
            "Apply job error:",
            error
        );


        // ---------------------------------------------
        // Mongo duplicate key
        // ---------------------------------------------
        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message: "You have already applied for this job.",
            });
        }


        return res.status(500).json({

            success: false,

            message: "Unable to apply for this job.",

            error: error.message,
        });
    }
};
// =====================================================
// MY APPLICATIONS
// GET /api/applications/my
// =====================================================

export const getMyApplications = async(
    req,
    res
) => {
    try {
        const studentId = req.user.id;

        const applications =
            await Application.find({
                student: studentId,
            })
            .populate(
                "job",
                "title location salary skills experience jobType deadline status company description"
            )
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });

    } catch (error) {
        console.error(
            "Get my applications error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch your applications.",
            error: error.message,
        });
    }
};

// =====================================================
// GET APPLICATION BY ID
// GET /api/applications/:id
// =====================================================

export const getApplicationById = async(
    req,
    res
) => {
    try {
        const application =
            await Application.findOne({
                _id: req.params.id,
                student: req.user.id,
            })
            .populate(
                "job",
                "title location salary skills experience jobType deadline status company description"
            );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found.",
            });
        }

        return res.status(200).json({
            success: true,
            application,
        });

    } catch (error) {
        console.error(
            "Get application error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch application.",
            error: error.message,
        });
    }
};

// =====================================================
// WITHDRAW APPLICATION
// DELETE /api/applications/:id/withdraw
// =====================================================

export const withdrawApplication = async(
    req,
    res
) => {
    try {
        const studentId = req.user.id;
        const applicationId = req.params.id;

        // -------------------------------------------------
        // Find application belonging to current student
        // -------------------------------------------------

        const application =
            await Application.findOne({
                _id: applicationId,
                student: studentId,
            });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found.",
            });
        }

        // -------------------------------------------------
        // Already withdrawn
        // -------------------------------------------------

        if (application.status === "Withdrawn") {
            return res.status(400).json({
                success: false,
                message: "This application has already been withdrawn.",
            });
        }

        // -------------------------------------------------
        // Prevent withdrawal after final decision
        // -------------------------------------------------

        if (
            ["Accepted", "Rejected"].includes(
                application.status
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "This application can no longer be withdrawn.",
            });
        }

        // -------------------------------------------------
        // Withdraw
        // -------------------------------------------------

        application.status = "Withdrawn";

        await application.save();

        // -------------------------------------------------
        // Return updated application
        // -------------------------------------------------

        const updatedApplication =
            await Application.findById(
                application._id
            ).populate(
                "job",
                "title location salary skills experience jobType deadline status company description"
            );

        return res.status(200).json({
            success: true,
            message: "Application withdrawn successfully.",
            application: updatedApplication,
        });

    } catch (error) {
        console.error(
            "Withdraw application error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to withdraw application.",
            error: error.message,
            details: error.message,
        });
    }
};

