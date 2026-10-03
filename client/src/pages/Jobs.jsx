import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

import API from "../services/api";

const Jobs = () => {
  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [jobType, setJobType] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ============================================
  // FETCH JOBS
  // ============================================

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/jobs");

      if (response.data?.success) {
        const fetchedJobs = Array.isArray(response.data.jobs)
          ? response.data.jobs
          : [];

        setJobs(fetchedJobs);

        const apiTotalPages =
          Number(response.data.pagination?.totalPages) || 1;

        setTotalPages(apiTotalPages);
      } else {
        setJobs([]);

        setError(
          response.data?.message || "Unable to fetch jobs."
        );
      }
    } catch (err) {
      console.error("Jobs fetch error:", err);

      setJobs([]);

      setError(
        err.response?.data?.message ||
          "Unable to load jobs. Please check whether the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ============================================
  // RESET PAGE WHEN FILTER CHANGES
  // ============================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    location,
    jobType,
    experienceLevel,
    sortBy,
  ]);

  // ============================================
  // FILTER OPTIONS
  // ============================================

  const jobTypes = useMemo(() => {
    const values = jobs
      .map((job) => job.jobType)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  const experienceLevels = useMemo(() => {
    const values = jobs
      .map((job) => job.experienceLevel)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  const locations = useMemo(() => {
    const values = jobs
      .map((job) => job.location)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  // ============================================
  // CLIENT SIDE FILTERING
  // ============================================

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const normalizedLocation =
      location.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const title =
        job.title?.toLowerCase() || "";

      const description =
        job.description?.toLowerCase() || "";

      const companyName =
        job.company?.name?.toLowerCase() ||
        job.company?.companyName?.toLowerCase() ||
        "";

      const jobLocation =
        job.location?.toLowerCase() || "";

      const skillsText = Array.isArray(job.skills)
        ? job.skills.join(" ").toLowerCase()
        : "";

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        companyName.includes(normalizedSearch) ||
        skillsText.includes(normalizedSearch);

      const matchesLocation =
        !normalizedLocation ||
        jobLocation.includes(normalizedLocation);

      const matchesJobType =
        !jobType ||
        job.jobType === jobType;

      const matchesExperience =
        !experienceLevel ||
        job.experienceLevel === experienceLevel;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience
      );
    });

    // ==========================================
    // SORTING
    // ==========================================

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
      );
    }

    if (sortBy === "salaryHigh") {
      result.sort(
        (a, b) =>
          Number(b.salary || 0) -
          Number(a.salary || 0)
      );
    }

    if (sortBy === "salaryLow") {
      result.sort(
        (a, b) =>
          Number(a.salary || 0) -
          Number(b.salary || 0)
      );
    }

    return result;
  }, [
    jobs,
    search,
    location,
    jobType,
    experienceLevel,
    sortBy,
  ]);

  // ============================================
  // CLEAR FILTERS
  // ============================================

  const handleClearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setExperienceLevel("");
    setSortBy("newest");
    setPage(1);
  };

  // ============================================
  // FORMAT SALARY
  // ============================================

  const formatSalary = (salary) => {
    if (
      salary === undefined ||
      salary === null ||
      salary === ""
    ) {
      return "Salary not disclosed";
    }

    const amount = Number(salary);

    if (Number.isNaN(amount)) {
      return String(salary);
    }

    return `₹${amount.toLocaleString("en-IN")}/year`;
  };

  // ============================================
  // FORMAT DATE
  // ============================================

  const formatDate = (date) => {
    if (!date) {
      return "No deadline";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No deadline";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================
  // COMPANY NAME
  // ============================================

  const getCompanyName = (job) => {
    return (
      job.company?.name ||
      job.company?.companyName ||
      job.company?.email ||
      "Company"
    );
  };

  // ============================================
  // COMPANY LOGO
  // ============================================

  const getCompanyLogo = (job) => {
    return job.company?.logo || "";
  };

  // ============================================
  // PAGINATION
  // ============================================

  const visibleJobs = useMemo(() => {
    const perPage = 12;

    const startIndex = (page - 1) * perPage;

    return filteredJobs.slice(
      startIndex,
      startIndex + perPage
    );
  }, [filteredJobs, page]);

  const clientTotalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / 12)
  );

  const finalTotalPages = Math.max(
    totalPages,
    clientTotalPages
  );

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <CircularProgress />

          <Typography
            color="text.secondary"
            fontWeight={600}
          >
            Loading jobs...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ============================================
  // PAGE
  // ============================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <Box
          sx={{
            mb: 4,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
            alignItems={{
              xs: "flex-start",
              md: "flex-end",
            }}
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  color: "#2563EB",
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Career Opportunities
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "2rem",
                    md: "3rem",
                  },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "#0F172A",
                }}
              >
                Find Your Dream Job
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: "text.secondary",
                  maxWidth: 700,
                  fontSize: {
                    xs: 15,
                    md: 17,
                  },
                }}
              >
                Discover opportunities that match your
                skills, experience and career goals.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={fetchJobs}
              sx={{
                borderRadius: 3,
                px: 2.5,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
                whiteSpace: "nowrap",
              }}
            >
              Refresh Jobs
            </Button>
          </Stack>
        </Box>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={fetchJobs}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* ======================================
            SEARCH + FILTERS
        ====================================== */}

        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 5,
            border:
              "1px solid rgba(15,23,42,.07)",
            boxShadow:
              "0 20px 50px rgba(15,23,42,.07)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              "&:last-child": {
                pb: {
                  xs: 2,
                  md: 3,
                },
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2.5 }}
            >
              <FilterAltRoundedIcon
                sx={{ color: "#2563EB" }}
              />

              <Typography
                fontWeight={800}
                fontSize={18}
              >
                Search & Filter Jobs
              </Typography>
            </Stack>

            <Grid
              container
              spacing={2}
            >
              {/* SEARCH */}

              <Grid
                size={{
                  xs: 12,
                  md: 5,
                }}
              >
                <TextField
                  fullWidth
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search job, skill or company..."
                  label="Search Jobs"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>

              {/* LOCATION */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 2.2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Location
                  </InputLabel>

                  <Select
                    value={location}
                    label="Location"
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <MenuItem value="">
                      All Locations
                    </MenuItem>

                    {locations.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* JOB TYPE */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 2.2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Job Type
                  </InputLabel>

                  <Select
                    value={jobType}
                    label="Job Type"
                    onChange={(e) =>
                      setJobType(e.target.value)
                    }
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <MenuItem value="">
                      All Types
                    </MenuItem>

                    {jobTypes.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* EXPERIENCE */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 2.6,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Experience
                  </InputLabel>

                  <Select
                    value={experienceLevel}
                    label="Experience"
                    onChange={(e) =>
                      setExperienceLevel(
                        e.target.value
                      )
                    }
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <MenuItem value="">
                      All Experience
                    </MenuItem>

                    {experienceLevels.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* SORT */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Sort By
                  </InputLabel>

                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <MenuItem value="newest">
                      Newest First
                    </MenuItem>

                    <MenuItem value="oldest">
                      Oldest First
                    </MenuItem>

                    <MenuItem value="salaryHigh">
                      Highest Salary
                    </MenuItem>

                    <MenuItem value="salaryLow">
                      Lowest Salary
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* CLEAR */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{
                    height: "56px",
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ======================================
            RESULTS HEADER
        ====================================== */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography
              fontWeight={800}
              fontSize={20}
            >
              Available Jobs
            </Typography>

            <Typography
              color="text.secondary"
              fontSize={14}
            >
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "job"
                : "jobs"}{" "}
              found
            </Typography>
          </Box>

          {(search ||
            location ||
            jobType ||
            experienceLevel) && (
            <Chip
              label="Filters Applied"
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>

        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {!filteredJobs.length ? (
          <Card
            elevation={0}
            sx={{
              borderRadius: 5,
              p: {
                xs: 4,
                md: 7,
              },
              textAlign: "center",
              border:
                "1px solid rgba(15,23,42,.07)",
            }}
          >
            <WorkRoundedIcon
              sx={{
                fontSize: 60,
                color: "text.disabled",
                mb: 2,
              }}
            />

            <Typography
              fontWeight={800}
              fontSize={24}
              mb={1}
            >
              No jobs found
            </Typography>

            <Typography
              color="text.secondary"
              mb={3}
            >
              Try changing your search or filters.
            </Typography>

            <Button
              variant="contained"
              onClick={handleClearFilters}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Clear All Filters
            </Button>
          </Card>
        ) : (
          <>
            {/* ==================================
                JOB CARDS
            ================================== */}

            <Grid
              container
              spacing={3}
            >
              {visibleJobs.map((job) => {
                const companyLogo =
                  getCompanyLogo(job);

                const companyName =
                  getCompanyName(job);

                return (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      lg: 4,
                    }}
                    key={job._id}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 5,
                        background: "#fff",
                        border:
                          "1px solid rgba(15,23,42,.07)",
                        boxShadow:
                          "0 15px 40px rgba(15,23,42,.055)",
                        transition:
                          "transform .25s ease, box-shadow .25s ease",
                        "&:hover": {
                          transform:
                            "translateY(-5px)",
                          boxShadow:
                            "0 24px 60px rgba(15,23,42,.12)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* CARD TOP */}

                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                          justifyContent="space-between"
                          sx={{ mb: 2.5 }}
                        >
                          <Box
                            sx={{
                              width: 58,
                              height: 58,
                              borderRadius: 3,
                              overflow: "hidden",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "linear-gradient(135deg,#EFF6FF,#EDE9FE)",
                              border:
                                "1px solid rgba(37,99,235,.08)",
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
                                  objectFit:
                                    "contain",
                                  p: 0.5,
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <BusinessRoundedIcon
                                sx={{
                                  color: "#2563EB",
                                  fontSize: 30,
                                }}
                              />
                            )}
                          </Box>

                          <Chip
                            size="small"
                            label={
                              job.status || "Open"
                            }
                            color={
                              job.status === "Closed"
                                ? "default"
                                : "success"
                            }
                            sx={{
                              fontWeight: 700,
                            }}
                          />
                        </Stack>

                        {/* TITLE */}

                        <Typography
                          fontWeight={900}
                          fontSize={21}
                          lineHeight={1.25}
                          sx={{
                            color: "#0F172A",
                            mb: 0.8,
                          }}
                        >
                          {job.title ||
                            "Untitled Position"}
                        </Typography>

                        {/* COMPANY */}

                        <Typography
                          fontWeight={700}
                          color="primary"
                          sx={{ mb: 2 }}
                        >
                          {companyName}
                        </Typography>

                        {/* LOCATION / TYPE */}

                        <Stack
                          direction="row"
                          spacing={1.5}
                          flexWrap="wrap"
                          useFlexGap
                          sx={{ mb: 2 }}
                        >
                          {job.location && (
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <LocationOnRoundedIcon
                                sx={{
                                  fontSize: 18,
                                  color:
                                    "text.secondary",
                                }}
                              />

                              <Typography
                                fontSize={13}
                                color="text.secondary"
                              >
                                {job.location}
                              </Typography>
                            </Stack>
                          )}

                          {job.jobType && (
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <WorkRoundedIcon
                                sx={{
                                  fontSize: 18,
                                  color:
                                    "text.secondary",
                                }}
                              />

                              <Typography
                                fontSize={13}
                                color="text.secondary"
                              >
                                {job.jobType}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>

                        {/* DESCRIPTION */}

                        <Typography
                          color="text.secondary"
                          fontSize={14}
                          lineHeight={1.7}
                          sx={{
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient:
                              "vertical",
                            overflow: "hidden",
                            mb: 2.5,
                          }}
                        >
                          {job.description ||
                            "No job description available."}
                        </Typography>

                        {/* SKILLS */}

                        {Array.isArray(
                          job.skills
                        ) &&
                          job.skills.length > 0 && (
                            <Stack
                              direction="row"
                              spacing={0.8}
                              flexWrap="wrap"
                              useFlexGap
                              sx={{
                                mb: 2.5,
                              }}
                            >
                              {job.skills
                                .slice(0, 5)
                                .map((skill) => (
                                  <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                      fontWeight: 600,
                                    }}
                                  />
                                ))}
                            </Stack>
                          )}

                        <Divider sx={{ mb: 2 }} />

                        {/* JOB META */}

                        <Stack
                          spacing={1.2}
                          sx={{ mb: 2.5 }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <CurrencyRupeeRoundedIcon
                              sx={{
                                fontSize: 20,
                                color:
                                  "#16A34A",
                              }}
                            />

                            <Typography
                              fontSize={14}
                              fontWeight={700}
                            >
                              {formatSalary(
                                job.salary
                              )}
                            </Typography>
                          </Stack>

                          {job.experienceLevel && (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <WorkRoundedIcon
                                sx={{
                                  fontSize: 19,
                                  color:
                                    "#7C3AED",
                                }}
                              />

                              <Typography
                                fontSize={14}
                                color="text.secondary"
                              >
                                {job.experienceLevel}
                              </Typography>
                            </Stack>
                          )}

                          {job.applicationDeadline && (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <AccessTimeRoundedIcon
                                sx={{
                                  fontSize: 19,
                                  color:
                                    "#EA580C",
                                }}
                              />

                              <Typography
                                fontSize={14}
                                color="text.secondary"
                              >
                                Apply by{" "}
                                {formatDate(
                                  job.applicationDeadline
                                )}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>

                        {/* BUTTON */}

                        <Box sx={{ mt: "auto" }}>
                          <Button
                            fullWidth
                            variant="contained"
                            endIcon={
                              <ArrowForwardRoundedIcon />
                            }
                            onClick={() =>
                              navigate(
                                `/job-details/${job._id}`
                              )
                            }
                            sx={{
                              py: 1.3,
                              borderRadius: 3,
                              fontWeight: 800,
                              textTransform:
                                "none",
                              background:
                                "linear-gradient(135deg,#2563EB,#7C3AED)",
                              boxShadow:
                                "0 10px 25px rgba(37,99,235,.2)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg,#1D4ED8,#6D28D9)",
                              },
                            }}
                          >
                            View Job Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {/* ==================================
                PAGINATION
            ================================== */}

            {filteredJobs.length > 12 && (
              <Stack
                alignItems="center"
                sx={{ mt: 5 }}
              >
                <Pagination
                  count={clientTotalPages}
                  page={page}
                  onChange={(_, value) =>
                    setPage(value)
                  }
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Jobs;