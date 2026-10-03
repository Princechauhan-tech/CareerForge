import { useEffect, useState } from "react";

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
  ArrowBackRounded,
  BusinessRounded,
  CalendarMonthRounded,
  LocationOnRounded,
  WorkRounded,
  CurrencyRupeeRounded,
  SendRounded,
  GroupsRounded,
} from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // FETCH JOB
  // =====================================================

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/jobs/${id}`);

      if (response.data.success) {
        setJob(response.data.job);
      } else {
        setError(
          response.data.message || "Unable to load job."
        );
      }
    } catch (err) {
      console.error("Fetch job error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load job."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // =====================================================
  // APPLY JOB
  // =====================================================

  const handleApply = async () => {
    try {
      setApplying(true);
      setError("");
      setSuccess("");

      const response = await API.post(
        `/applications/${id}`,
        {
          coverLetter: "",
        }
      );

      if (response.data.success) {
        setSuccess(
          "Application submitted successfully!"
        );

        setTimeout(() => {
          navigate("/my-applications");
        }, 1200);
      } else {
        setError(
          response.data.message ||
            "Unable to apply for this job."
        );
      }
    } catch (err) {
      console.error("Apply job error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =====================================================
  // JOB NOT FOUND
  // =====================================================

  if (!job) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg,#F8FAFC,#EEF4FF)",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error">
            {error || "Job not found."}
          </Alert>

          <Button
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/jobs")}
            sx={{
              mt: 3,
              fontWeight: 700,
            }}
          >
            Back to Jobs
          </Button>
        </Container>
      </Box>
    );
  }

  // =====================================================
  // COMPANY DATA
  // =====================================================

  const companyName =
    job.company?.name ||
    job.company?.companyName ||
    job.companyName ||
    "Company";

  const companyLogo =
    job.company?.logo ||
    job.company?.companyLogo ||
    job.companyLogo ||
    "";

  // =====================================================
  // SALARY
  // =====================================================

  const salaryMin = Number(job.salaryMin || 0);
  const salaryMax = Number(job.salaryMax || 0);

  const formatSalary = (salary) => {
    if (!salary) return "";

    return `₹${salary.toLocaleString("en-IN")}`;
  };

  let salaryText = "Not specified";

  if (salaryMin && salaryMax) {
    salaryText = `${formatSalary(
      salaryMin
    )} - ${formatSalary(salaryMax)}`;
  } else if (salaryMin) {
    salaryText = `${formatSalary(
      salaryMin
    )}+`;
  } else if (salaryMax) {
    salaryText = `Up to ${formatSalary(
      salaryMax
    )}`;
  }

  // =====================================================
  // DEADLINE
  // =====================================================

  const deadlineText = job.deadline
    ? new Date(
        job.deadline
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  // =====================================================
  // STATUS
  // =====================================================

  const isOpen = job.status === "Open";

  // =====================================================
  // UI
  // =====================================================

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
        {/* =================================================
            BACK
        ================================================= */}

        <Button
          startIcon={<ArrowBackRounded />}
          onClick={() => navigate("/jobs")}
          sx={{
            mb: 3,
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          Back to Jobs
        </Button>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
          >
            {success}
          </Alert>
        )}

        {/* =================================================
            JOB HEADER
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 5,
            mb: 3,
            border:
              "1px solid rgba(15,23,42,.06)",
            boxShadow:
              "0 15px 40px rgba(15,23,42,.06)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            spacing={4}
          >
            {/* JOB INFO */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={3}
            >
              {/* COMPANY LOGO */}

              <Box
                sx={{
                  width: 82,
                  height: 82,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg,#EEF2FF,#F5F3FF)",
                  border:
                    "1px solid rgba(79,70,229,.08)",
                }}
              >
                {companyLogo ? (
                  <Box
                    component="img"
                    src={companyLogo}
                    alt={companyName}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <BusinessRounded
                    sx={{
                      fontSize: 42,
                      color: "#4F46E5",
                    }}
                  />
                )}
              </Box>

              {/* TEXT */}

              <Box>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      md: "3rem",
                    },
                    lineHeight: 1.1,
                  }}
                >
                  {job.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  fontWeight={700}
                  sx={{
                    mt: 1,
                    fontSize: "1.05rem",
                  }}
                >
                  {companyName}
                </Typography>

                {/* CHIPS */}

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
                    icon={<LocationOnRounded />}
                    label={
                      job.location ||
                      "Location not specified"
                    }
                  />

                  <Chip
                    icon={<WorkRounded />}
                    label={
                      job.jobType ||
                      "Full-Time"
                    }
                  />

                  <Chip
                    label={
                      job.experience ||
                      "Fresher"
                    }
                  />

                  <Chip
                    label={job.status || "Open"}
                    color={
                      isOpen
                        ? "success"
                        : "default"
                    }
                  />
                </Stack>
              </Box>
            </Stack>

            {/* APPLY */}

            <Box
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 220,
                },
              }}
            >
              <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={
                  applying ? (
                    <CircularProgress
                      size={20}
                      color="inherit"
                    />
                  ) : (
                    <SendRounded />
                  )
                }
                onClick={handleApply}
                disabled={
                  applying || !isOpen
                }
                sx={{
                  minHeight: 56,
                  borderRadius: 3,
                  fontWeight: 800,
                  fontSize: "1rem",
                  background:
                    "linear-gradient(135deg,#2563EB,#7C3AED)",
                  boxShadow:
                    "0 12px 30px rgba(37,99,235,.25)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#1D4ED8,#6D28D9)",
                  },
                }}
              >
                {applying
                  ? "Applying..."
                  : isOpen
                  ? "Apply Now"
                  : "Applications Closed"}
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{
                  mt: 1.5,
                }}
              >
                Your uploaded resume will be
                used for this application.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gap: 3,
          }}
        >
          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              borderRadius: 5,
              border:
                "1px solid rgba(15,23,42,.06)",
              boxShadow:
                "0 15px 40px rgba(15,23,42,.06)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              mb={2}
            >
              Job Description
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.9,
                whiteSpace: "pre-line",
              }}
            >
              {job.description ||
                "No description available."}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography
              variant="h5"
              fontWeight={900}
              mb={2}
            >
              Required Skills
            </Typography>

            {job.skills?.length > 0 ? (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                {job.skills.map(
                  (skill, index) => (
                    <Chip
                      key={`${skill}-${index}`}
                      label={skill}
                      color="primary"
                      variant="outlined"
                    />
                  )
                )}
              </Stack>
            ) : (
              <Typography color="text.secondary">
                No specific skills listed.
              </Typography>
            )}
          </Paper>

          {/* =================================================
              JOB OVERVIEW
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "fit-content",
              border:
                "1px solid rgba(15,23,42,.06)",
              boxShadow:
                "0 15px 40px rgba(15,23,42,.06)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={900}
              mb={3}
            >
              Job Overview
            </Typography>

            <Stack spacing={3}>
              {/* SALARY */}

              <Stack
                direction="row"
                spacing={2}
              >
                <CurrencyRupeeRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Salary
                  </Typography>

                  <Typography fontWeight={800}>
                    {salaryText}
                  </Typography>
                </Box>
              </Stack>

              {/* LOCATION */}

              <Stack
                direction="row"
                spacing={2}
              >
                <LocationOnRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Location
                  </Typography>

                  <Typography fontWeight={800}>
                    {job.location ||
                      "Not specified"}
                  </Typography>
                </Box>
              </Stack>

              {/* JOB TYPE */}

              <Stack
                direction="row"
                spacing={2}
              >
                <WorkRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Job Type
                  </Typography>

                  <Typography fontWeight={800}>
                    {job.jobType ||
                      "Full-Time"}
                  </Typography>
                </Box>
              </Stack>

              {/* EXPERIENCE */}

              <Stack
                direction="row"
                spacing={2}
              >
                <GroupsRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Experience
                  </Typography>

                  <Typography fontWeight={800}>
                    {job.experience ||
                      "Fresher"}
                  </Typography>
                </Box>
              </Stack>

              {/* DEADLINE */}

              <Stack
                direction="row"
                spacing={2}
              >
                <CalendarMonthRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Application Deadline
                  </Typography>

                  <Typography fontWeight={800}>
                    {deadlineText}
                  </Typography>
                </Box>
              </Stack>

              {/* OPENINGS */}

              <Stack
                direction="row"
                spacing={2}
              >
                <GroupsRounded color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Openings
                  </Typography>

                  <Typography fontWeight={800}>
                    {job.openings || 1}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default JobDetails;