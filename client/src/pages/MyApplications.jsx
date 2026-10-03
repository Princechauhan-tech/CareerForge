import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForwardRounded,
  BusinessRounded,
  CalendarMonthRounded,
  LocationOnRounded,
  WorkRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


// ============================================================
// STATUS COLOR
// ============================================================

const getStatusColor = (status) => {
  const normalizedStatus = String(
    status || "Pending"
  ).toLowerCase();

  switch (normalizedStatus) {
    case "shortlisted":
      return "success";

    case "accepted":
      return "success";

    case "rejected":
      return "error";

    case "withdrawn":
      return "default";

    case "pending":
    case "applied":
    default:
      return "warning";
  }
};


// ============================================================
// STATUS LABEL
// ============================================================

const getStatusLabel = (status) => {
  if (!status) {
    return "Pending";
  }

  const normalizedStatus = String(status)
    .toLowerCase();

  switch (normalizedStatus) {
    case "shortlisted":
      return "Shortlisted";

    case "accepted":
      return "Accepted";

    case "rejected":
      return "Rejected";

    case "withdrawn":
      return "Withdrawn";

    case "applied":
      return "Applied";

    case "pending":
      return "Pending";

    default:
      return status;
  }
};


// ============================================================
// CHECK WITHDRAWN
// ============================================================

const isWithdrawnApplication = (application) => {
  const status = String(
    application?.status || ""
  ).toLowerCase();

  return status === "withdrawn";
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const MyApplications = () => {
  const navigate = useNavigate();


  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [withdrawingId, setWithdrawingId] =
    useState(null);


  // ==========================================================
  // FETCH APPLICATIONS
  // ==========================================================

  const fetchApplications = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/applications/my"
        );


        if (response.data?.success) {
          const serverApplications =
            response.data?.applications || [];


          // --------------------------------------------------
          // Remove withdrawn applications from UI
          // --------------------------------------------------

          const activeApplications =
            serverApplications.filter(
              (application) =>
                !isWithdrawnApplication(
                  application
                )
            );


          setApplications(
            activeApplications
          );
        } else {
          setApplications([]);

          setError(
            response.data?.message ||
              "Unable to load applications."
          );
        }
      } catch (err) {
        console.error(
          "Fetch Applications Error:",
          err
        );


        setError(
          err.response?.data?.message ||
            "Unable to load applications."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );


  // ==========================================================
  // LOAD APPLICATIONS ON PAGE LOAD
  // ==========================================================

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);


  // ==========================================================
  // WITHDRAW APPLICATION
  // ==========================================================

  const handleWithdraw = async (
    applicationId
  ) => {
    if (!applicationId) {
      setError(
        "Application ID is missing."
      );

      return;
    }


    // Prevent double click
    if (withdrawingId) {
      return;
    }


    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );


    if (!confirmed) {
      return;
    }


    try {
      setWithdrawingId(
        applicationId
      );

      setError("");


      // ------------------------------------------------------
      // BACKEND REQUEST
      // ------------------------------------------------------

      await API.delete(
        `/applications/${applicationId}/withdraw`
      );


      // ------------------------------------------------------
      // IMMEDIATELY REMOVE FROM UI
      // ------------------------------------------------------

      setApplications(
        (previousApplications) =>
          previousApplications.filter(
            (application) =>
              application._id !==
              applicationId
          )
      );


      // ------------------------------------------------------
      // OPTIONAL: REFRESH FROM BACKEND
      // ------------------------------------------------------

      await fetchApplications();
    } catch (err) {
      console.error(
        "Withdraw Application Error:",
        err
      );


      setError(
        err.response?.data?.message ||
          "Unable to withdraw application. Please try again."
      );
    } finally {
      setWithdrawingId(null);
    }
  };


  // ==========================================================
  // VIEW JOB
  // ==========================================================

  const handleViewJob = (jobId) => {
    if (!jobId) {
      setError(
        "Job information is not available."
      );

      return;
    }


    navigate(
      `/job-details/${jobId}`
    );
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#F8FAFC,#EEF4FF)",

        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* ==================================================
            HEADER
        ================================================== */}

        <Box sx={{ mb: 4 }}>

          <Typography
            variant="h2"
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "2.2rem",
                md: "3.2rem",
              },
            }}
          >
            My Applications
          </Typography>


          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: "1.05rem",
            }}
          >
            Track all your job applications
            and their current status.
          </Typography>

        </Box>


        {/* ==================================================
            ERROR ALERT
        ================================================== */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
            onClose={() =>
              setError("")
            }
          >
            {error}
          </Alert>
        )}


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <Box
            sx={{
              minHeight: 300,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {!loading &&
          applications.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 4,
                  md: 7,
                },

                textAlign: "center",

                borderRadius: 5,

                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >

              <WorkRounded
                sx={{
                  fontSize: 60,
                  color: "text.secondary",
                  mb: 2,
                }}
              />


              <Typography
                variant="h5"
                fontWeight={900}
              >
                No active applications
              </Typography>


              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Start applying to jobs that
                match your skills.
              </Typography>


              <Button
                variant="contained"
                onClick={() =>
                  navigate("/jobs")
                }
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  fontWeight: 800,
                  px: 3,
                  py: 1.2,
                }}
              >
                Browse Jobs
              </Button>

            </Paper>
          )}


        {/* ==================================================
            APPLICATION LIST
        ================================================== */}

        {!loading &&
          applications.length > 0 && (

            <Stack spacing={2.5}>

              {applications.map(
                (application) => {

                  const job =
                    application?.job;


                  // ------------------------------------------------
                  // If job data is missing
                  // ------------------------------------------------

                  if (!job) {
                    return (
                      <Paper
                        key={
                          application._id
                        }
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 5,
                          border:
                            "1px solid #E2E8F0",
                        }}
                      >
                        <Typography
                          fontWeight={800}
                        >
                          Job information
                          unavailable
                        </Typography>


                        <Typography
                          color="text.secondary"
                          sx={{
                            mt: 1,
                          }}
                        >
                          This application
                          does not contain
                          job details.
                        </Typography>
                      </Paper>
                    );
                  }


                  // ------------------------------------------------
                  // Company name
                  // ------------------------------------------------

                  const company =
                    job.company
                      ?.companyName ||
                    job.company?.name ||
                    "Company";


                  // ------------------------------------------------
                  // Status
                  // ------------------------------------------------

                  const status =
                    getStatusLabel(
                      application.status
                    );


                  // ------------------------------------------------
                  // Withdraw loading
                  // ------------------------------------------------

                  const isWithdrawing =
                    withdrawingId ===
                    application._id;


                  // ------------------------------------------------
                  // Render card
                  // ------------------------------------------------

                  return (
                    <Paper
                      key={
                        application._id
                      }
                      elevation={0}
                      sx={{
                        p: {
                          xs: 2.5,
                          md: 3.5,
                        },

                        borderRadius: 5,

                        background:
                          "#FFFFFF",

                        boxShadow:
                          "0 15px 40px rgba(15,23,42,.06)",

                        border:
                          "1px solid rgba(226,232,240,.8)",

                        transition:
                          "all .25s ease",

                        "&:hover": {
                          transform:
                            "translateY(-2px)",

                          boxShadow:
                            "0 20px 45px rgba(15,23,42,.09)",
                        },
                      }}
                    >

                      {/* ========================================
                          TOP CONTENT
                      ======================================== */}

                      <Stack
                        direction={{
                          xs: "column",
                          md: "row",
                        }}

                        justifyContent="space-between"

                        spacing={3}
                      >

                        {/* ======================================
                            JOB INFO
                        ====================================== */}

                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >

                            {/* Job Icon */}

                            <Box
                              sx={{
                                width: 55,
                                height: 55,

                                minWidth: 55,

                                borderRadius: 3,

                                display: "flex",

                                alignItems:
                                  "center",

                                justifyContent:
                                  "center",

                                background:
                                  "linear-gradient(135deg,#EEF2FF,#F5F3FF)",
                              }}
                            >
                              <BusinessRounded
                                color="primary"
                              />
                            </Box>


                            {/* Job Title */}

                            <Box
                              sx={{
                                minWidth: 0,
                              }}
                            >

                              <Typography
                                variant="h6"
                                fontWeight={900}
                                sx={{
                                  overflow:
                                    "hidden",

                                  textOverflow:
                                    "ellipsis",

                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {job.title ||
                                  "Job"}
                              </Typography>


                              <Typography
                                color="text.secondary"
                              >
                                {company}
                              </Typography>

                            </Box>

                          </Stack>


                          {/* ====================================
                              JOB META
                          ==================================== */}

                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{
                              mt: 2,
                            }}
                          >

                            <Chip
                              size="small"
                              icon={
                                <LocationOnRounded />
                              }
                              label={
                                job.location ||
                                "Remote"
                              }
                            />


                            <Chip
                              size="small"
                              icon={
                                <WorkRounded />
                              }
                              label={
                                job.jobType ||
                                "Full-Time"
                              }
                            />


                            <Chip
                              size="small"
                              icon={
                                <CalendarMonthRounded />
                              }
                              label={
                                application.createdAt
                                  ? `Applied ${new Date(
                                      application.createdAt
                                    ).toLocaleDateString(
                                      "en-IN"
                                    )}`
                                  : "Application date unavailable"
                              }
                            />

                          </Stack>

                        </Box>


                        {/* ======================================
                            RIGHT ACTIONS
                        ====================================== */}

                        <Stack
                          alignItems={{
                            xs: "stretch",
                            md: "flex-end",
                          }}

                          spacing={1.5}
                        >

                          {/* STATUS */}

                          <Chip
                            label={status}
                            color={getStatusColor(
                              application.status
                            )}
                            sx={{
                              fontWeight: 800,
                            }}
                          />


                          {/* WITHDRAW */}

                          <Button
                            color="error"
                            variant="outlined"

                            disabled={
                              isWithdrawing
                            }

                            onClick={() =>
                              handleWithdraw(
                                application._id
                              )
                            }

                            sx={{
                              borderRadius: 3,
                              fontWeight: 700,
                              minWidth: 130,
                            }}
                          >

                            {isWithdrawing ? (
                              <CircularProgress
                                size={20}
                                color="inherit"
                              />
                            ) : (
                              "Withdraw"
                            )}

                          </Button>


                          {/* VIEW JOB */}

                          <Button
                            variant="outlined"

                            endIcon={
                              <ArrowForwardRounded />
                            }

                            onClick={() =>
                              handleViewJob(
                                job._id
                              )
                            }

                            sx={{
                              borderRadius: 3,
                              fontWeight: 700,
                              minWidth: 130,
                            }}
                          >
                            View Job
                          </Button>

                        </Stack>

                      </Stack>


                      {/* ========================================
                          DIVIDER
                      ======================================== */}

                      <Divider
                        sx={{
                          my: 2.5,
                        }}
                      />


                      {/* ========================================
                          APPLICATION STATUS
                      ======================================== */}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Application status:{" "}
                        <strong>
                          {status}
                        </strong>
                      </Typography>

                    </Paper>
                  );
                }
              )}

            </Stack>
          )}

      </Container>
    </Box>
  );
};


export default MyApplications;