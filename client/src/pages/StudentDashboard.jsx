import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";


// ============================================================
// STATIC DASHBOARD DATA
// ============================================================

const stats = [
  {
    title: "Applied Jobs",
    value: "24",
    subtitle: "+4 this month",
    icon: <WorkRoundedIcon />,
    color: "#2563EB",
    background: "#EFF6FF",
  },
  {
    title: "Interviews",
    value: "8",
    subtitle: "2 upcoming",
    icon: <CalendarMonthRoundedIcon />,
    color: "#7C3AED",
    background: "#F5F3FF",
  },
  {
    title: "Offers",
    value: "3",
    subtitle: "+1 this month",
    icon: <AssignmentTurnedInRoundedIcon />,
    color: "#059669",
    background: "#ECFDF5",
  },
  {
    title: "Profile Score",
    value: "92%",
    subtitle: "Excellent",
    icon: <TrendingUpRoundedIcon />,
    color: "#EA580C",
    background: "#FFF7ED",
  },
];


const recentApplications = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
    date: "Mar 08, 2026",
    color: "#2563EB",
  },
  {
    company: "Microsoft",
    role: "React Developer",
    status: "Applied",
    date: "Mar 05, 2026",
    color: "#7C3AED",
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    status: "Shortlisted",
    date: "Mar 02, 2026",
    color: "#059669",
  },
];


const recommendedJobs = [
  {
    role: "MERN Stack Developer",
    company: "TechNova",
    match: "96%",
  },
  {
    role: "Frontend Engineer",
    company: "Innovate Labs",
    match: "93%",
  },
  {
    role: "React Developer",
    company: "CloudWorks",
    match: "91%",
  },
  {
    role: "Software Engineer",
    company: "NextGen Systems",
    match: "88%",
  },
];


const upcomingInterviews = [
  {
    company: "Google",
    role: "Frontend Developer",
    date: "12 March 2026",
    time: "10:30 AM",
  },
  {
    company: "Microsoft",
    role: "React Developer",
    date: "18 March 2026",
    time: "02:00 PM",
  },
];


const activities = [
  {
    text: "Applied for Frontend Developer at Google",
    time: "2 hours ago",
    icon: <WorkRoundedIcon />,
  },
  {
    text: "Resume updated successfully",
    time: "Yesterday",
    icon: <DescriptionRoundedIcon />,
  },
  {
    text: "Interview scheduled with Microsoft",
    time: "2 days ago",
    icon: <CalendarMonthRoundedIcon />,
  },
  {
    text: "Profile completion increased to 85%",
    time: "4 days ago",
    icon: <TrendingUpRoundedIcon />,
  },
];


// ============================================================
// REUSABLE COMPONENTS
// ============================================================

const SectionTitle = ({
  title,
  subtitle,
  action,
  onAction,
}) => {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        sm: "center",
      }}
      spacing={1}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography
          fontWeight={900}
          fontSize="1.35rem"
          color="#0F172A"
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && (
        <Button
          onClick={onAction}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            color: "#2563EB",
            borderRadius: 3,
          }}
        >
          {action}
        </Button>
      )}
    </Stack>
  );
};


const DashboardCard = ({
  children,
  sx = {},
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 5,
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow:
          "0 18px 45px rgba(15,23,42,0.055)",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const StudentDashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );


  const userName =
    user?.name ||
    user?.fullName ||
    "Student";


  const firstLetter =
    userName?.charAt(0)?.toUpperCase() || "S";


  // ==========================================================
  // NAVIGATION HELPERS
  // ==========================================================

  const goToProfile = () => {
    navigate("/profile");
  };


  const goToJobs = () => {
    navigate("/jobs");
  };


  const goToApplications = () => {
    navigate("/my-applications");
  };


  const goToCalendar = () => {
    navigate("/calendar");
  };


  const goToResumeAnalyzer = () => {
    navigate("/resume-analyzer");
  };


  const goToAISuggestions = () => {
    navigate("/ai-suggestions");
  };


  const goToInterviewQuestions = () => {
    navigate("/ai-interview-questions");
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* ==================================================
            HERO
        ================================================== */}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: {
              xs: 4,
              md: 6,
            },
            color: "#FFFFFF",
            background:
              "linear-gradient(135deg,#1D4ED8 0%,#2563EB 45%,#7C3AED 100%)",
            boxShadow:
              "0 25px 60px rgba(37,99,235,.22)",
            mb: 4,
          }}
        >

          {/* Decorative circles */}

          <Box
            sx={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "rgba(255,255,255,.08)",
              right: -100,
              top: -120,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "rgba(255,255,255,.06)",
              right: 120,
              bottom: -100,
            }}
          />

          <Grid
            container
            spacing={4}
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >

            {/* Hero Left */}

            <Grid size={{ xs: 12, md: 8 }}>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                spacing={2.5}
              >

                <Avatar
                  src={user?.profileImage}
                  sx={{
                    width: {
                      xs: 70,
                      sm: 84,
                    },
                    height: {
                      xs: 70,
                      sm: 84,
                    },
                    fontSize: {
                      xs: 28,
                      sm: 34,
                    },
                    fontWeight: 900,
                    background:
                      "rgba(255,255,255,.18)",
                    border:
                      "3px solid rgba(255,255,255,.35)",
                    boxShadow:
                      "0 12px 30px rgba(0,0,0,.12)",
                  }}
                >
                  {firstLetter}
                </Avatar>


                <Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1.8rem",
                        sm: "2.2rem",
                        md: "2.5rem",
                      },
                      lineHeight: 1.15,
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                    }}
                  >
                    Welcome back, {userName} 👋
                  </Typography>


                  <Typography
                    sx={{
                      mt: 1,
                      maxWidth: 650,
                      color:
                        "rgba(255,255,255,.82)",
                      fontSize: {
                        xs: "0.95rem",
                        md: "1rem",
                      },
                    }}
                  >
                    Track your career journey,
                    discover better opportunities
                    and prepare yourself for your
                    next big interview.
                  </Typography>


                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 2.5,
                    }}
                  >

                    <Chip
                      icon={
                        <CheckCircleRoundedIcon
                          sx={{
                            color:
                              "#FFFFFF !important",
                          }}
                        />
                      }
                      label="Profile Active"
                      sx={{
                        color: "#FFFFFF",
                        background:
                          "rgba(255,255,255,.13)",
                        border:
                          "1px solid rgba(255,255,255,.2)",
                        fontWeight: 700,
                      }}
                    />

                  </Stack>

                </Box>

              </Stack>

            </Grid>


            {/* Hero Right */}

            <Grid size={{ xs: 12, md: 4 }}>

              <Stack
                spacing={1.5}
                alignItems={{
                  xs: "stretch",
                  md: "flex-end",
                }}
              >

                <Button
                  variant="contained"
                  onClick={goToProfile}
                  startIcon={
                    <PersonRoundedIcon />
                  }
                  sx={{
                    minWidth: {
                      xs: "100%",
                      md: 190,
                    },
                    background: "#FFFFFF",
                    color: "#2563EB",
                    fontWeight: 800,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow:
                      "0 12px 25px rgba(0,0,0,.12)",
                    "&:hover": {
                      background: "#F8FAFC",
                    },
                  }}
                >
                  Complete Profile
                </Button>


                <Button
                  variant="outlined"
                  onClick={goToResumeAnalyzer}
                  startIcon={
                    <DescriptionRoundedIcon />
                  }
                  sx={{
                    minWidth: {
                      xs: "100%",
                      md: 190,
                    },
                    color: "#FFFFFF",
                    borderColor:
                      "rgba(255,255,255,.55)",
                    fontWeight: 800,
                    borderRadius: 3,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#FFFFFF",
                      background:
                        "rgba(255,255,255,.08)",
                    },
                  }}
                >
                  Analyze Resume
                </Button>

              </Stack>

            </Grid>

          </Grid>

        </Paper>


        {/* ==================================================
            STATS
        ================================================== */}

        <Grid
          container
          spacing={3}
        >

          {stats.map((item) => (
            <Grid
              key={item.title}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >

              <DashboardCard>

                <Box
                  sx={{
                    p: 3,
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >

                    <Box>

                      <Typography
                        color="text.secondary"
                        fontWeight={600}
                        fontSize=".9rem"
                      >
                        {item.title}
                      </Typography>


                      <Typography
                        fontWeight={950}
                        fontSize="2.25rem"
                        color="#0F172A"
                        sx={{
                          mt: 0.5,
                          letterSpacing: "-.04em",
                        }}
                      >
                        {item.value}
                      </Typography>


                      <Typography
                        fontSize=".78rem"
                        fontWeight={700}
                        sx={{
                          mt: 0.5,
                          color: item.color,
                        }}
                      >
                        {item.subtitle}
                      </Typography>

                    </Box>


                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          item.background,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Box>

                  </Stack>

                </Box>

              </DashboardCard>

            </Grid>
          ))}

        </Grid>


        {/* ==================================================
            AI TOOLS
        ================================================== */}

        <Box sx={{ mt: 5 }}>

          <SectionTitle
            title="AI Career Tools"
            subtitle="Smart tools to improve your career readiness"
          />


          <Grid
            container
            spacing={3}
          >

            {/* Resume Analyzer */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <DashboardCard
                sx={{
                  background:
                    "linear-gradient(135deg,#ECFDF5,#FFFFFF)",
                  borderColor: "#BBF7D0",
                }}
              >

                <Box sx={{ p: 3 }}>

                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#D1FAE5",
                      color: "#059669",
                    }}
                  >
                    <DescriptionRoundedIcon />
                  </Box>


                  <Typography
                    fontWeight={900}
                    fontSize="1.25rem"
                    sx={{ mt: 2 }}
                  >
                    Resume Analyzer
                  </Typography>


                  <Typography
                    color="text.secondary"
                    fontSize=".9rem"
                    sx={{
                      mt: 1,
                      minHeight: 45,
                    }}
                  >
                    Analyze your resume and
                    discover your ATS compatibility
                    score.
                  </Typography>


                  <Button
                    fullWidth
                    variant="contained"
                    onClick={goToResumeAnalyzer}
                    endIcon={
                      <ArrowForwardRoundedIcon />
                    }
                    sx={{
                      mt: 2.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg,#059669,#10B981)",
                    }}
                  >
                    Analyze Resume
                  </Button>

                </Box>

              </DashboardCard>

            </Grid>


            {/* AI Suggestions */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <DashboardCard
                sx={{
                  background:
                    "linear-gradient(135deg,#F5F3FF,#FFFFFF)",
                  borderColor: "#DDD6FE",
                }}
              >

                <Box sx={{ p: 3 }}>

                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#EDE9FE",
                      color: "#7C3AED",
                    }}
                  >
                    <AutoAwesomeRoundedIcon />
                  </Box>


                  <Typography
                    fontWeight={900}
                    fontSize="1.25rem"
                    sx={{ mt: 2 }}
                  >
                    AI Suggestions
                  </Typography>


                  <Typography
                    color="text.secondary"
                    fontSize=".9rem"
                    sx={{
                      mt: 1,
                      minHeight: 45,
                    }}
                  >
                    Get personalized suggestions
                    to improve your profile and
                    career readiness.
                  </Typography>


                  <Button
                    fullWidth
                    variant="contained"
                    onClick={goToAISuggestions}
                    endIcon={
                      <ArrowForwardRoundedIcon />
                    }
                    sx={{
                      mt: 2.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg,#6D28D9,#8B5CF6)",
                    }}
                  >
                    View Suggestions
                  </Button>

                </Box>

              </DashboardCard>

            </Grid>


            {/* Interview AI */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >

              <DashboardCard
                sx={{
                  background:
                    "linear-gradient(135deg,#EFF6FF,#FFFFFF)",
                  borderColor: "#BFDBFE",
                }}
              >

                <Box sx={{ p: 3 }}>

                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#DBEAFE",
                      color: "#2563EB",
                    }}
                  >
                    <PsychologyRoundedIcon />
                  </Box>


                  <Typography
                    fontWeight={900}
                    fontSize="1.25rem"
                    sx={{ mt: 2 }}
                  >
                    AI Interview Coach
                  </Typography>


                  <Typography
                    color="text.secondary"
                    fontSize=".9rem"
                    sx={{
                      mt: 1,
                      minHeight: 45,
                    }}
                  >
                    Practice technical and HR
                    interview questions with AI.
                  </Typography>


                  <Button
                    fullWidth
                    variant="contained"
                    onClick={goToInterviewQuestions}
                    endIcon={
                      <ArrowForwardRoundedIcon />
                    }
                    sx={{
                      mt: 2.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg,#1D4ED8,#3B82F6)",
                    }}
                  >
                    Start Practice
                  </Button>

                </Box>

              </DashboardCard>

            </Grid>

          </Grid>

        </Box>


        {/* ==================================================
            APPLICATIONS + RECOMMENDED JOBS
        ================================================== */}

        <Grid
          container
          spacing={4}
          sx={{
            mt: 1,
          }}
        >

          {/* Applications */}

          <Grid
            size={{
              xs: 12,
              lg: 7,
            }}
          >

            <DashboardCard>

              <Box sx={{ p: 4 }}>

                <SectionTitle
                  title="Recent Applications"
                  subtitle="Keep track of your latest job applications"
                  action="View All"
                  onAction={goToApplications}
                />


                <Stack spacing={2}>

                  {recentApplications.map(
                    (job) => (
                      <Box
                        key={`${job.company}-${job.role}`}
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          background: "#F8FAFC",
                          border:
                            "1px solid #E2E8F0",
                          transition: ".2s",
                          "&:hover": {
                            borderColor: "#BFDBFE",
                            transform:
                              "translateY(-2px)",
                          },
                        }}
                      >

                        <Stack
                          direction={{
                            xs: "column",
                            sm: "row",
                          }}
                          justifyContent="space-between"
                          alignItems={{
                            xs: "flex-start",
                            sm: "center",
                          }}
                          spacing={2}
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >

                            <Avatar
                              sx={{
                                width: 46,
                                height: 46,
                                background:
                                  `${job.color}15`,
                                color: job.color,
                                fontWeight: 900,
                              }}
                            >
                              {job.company.charAt(
                                0
                              )}
                            </Avatar>


                            <Box>

                              <Typography
                                fontWeight={800}
                              >
                                {job.role}
                              </Typography>


                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {job.company}
                              </Typography>

                            </Box>

                          </Stack>


                          <Stack
                            alignItems={{
                              xs: "flex-start",
                              sm: "flex-end",
                            }}
                            spacing={0.7}
                          >

                            <Chip
                              label={job.status}
                              size="small"
                              sx={{
                                background:
                                  `${job.color}12`,
                                color: job.color,
                                fontWeight: 800,
                              }}
                            />


                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {job.date}
                            </Typography>

                          </Stack>

                        </Stack>

                      </Box>
                    )
                  )}

                </Stack>

              </Box>

            </DashboardCard>

          </Grid>


          {/* Recommended */}

          <Grid
            size={{
              xs: 12,
              lg: 5,
            }}
          >

            <DashboardCard>

              <Box sx={{ p: 4 }}>

                <SectionTitle
                  title="Recommended Jobs"
                  subtitle="Based on your profile"
                  action="Browse Jobs"
                  onAction={goToJobs}
                />


                <Stack spacing={1.5}>

                  {recommendedJobs.map(
                    (job) => (
                      <Box
                        key={`${job.company}-${job.role}`}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          border:
                            "1px solid #E2E8F0",
                          background: "#F8FAFC",
                        }}
                      >

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >

                          <Box>

                            <Typography
                              fontWeight={800}
                              fontSize=".95rem"
                            >
                              {job.role}
                            </Typography>


                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {job.company}
                            </Typography>

                          </Box>


                          <Chip
                            label={`${job.match} match`}
                            size="small"
                            sx={{
                              color: "#059669",
                              background:
                                "#ECFDF5",
                              fontWeight: 800,
                            }}
                          />

                        </Stack>

                      </Box>
                    )
                  )}

                </Stack>

              </Box>

            </DashboardCard>

          </Grid>

        </Grid>


        {/* ==================================================
            RESUME + PROFILE
        ================================================== */}

        <Grid
          container
          spacing={4}
          sx={{
            mt: 1,
          }}
        >

          {/* Resume Score */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: 4,
                borderRadius: 5,
                color: "#FFFFFF",
                background:
                  "linear-gradient(135deg,#059669,#10B981)",
                boxShadow:
                  "0 20px 45px rgba(5,150,105,.18)",
              }}
            >

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >

                <Box>

                  <Typography
                    fontWeight={900}
                    fontSize="1.3rem"
                  >
                    Resume Score
                  </Typography>


                  <Typography
                    sx={{
                      mt: 1,
                      color:
                        "rgba(255,255,255,.8)",
                    }}
                  >
                    Your resume is performing
                    very well.
                  </Typography>

                </Box>


                <DescriptionRoundedIcon
                  sx={{
                    fontSize: 36,
                    opacity: .85,
                  }}
                />

              </Stack>


              <Typography
                fontWeight={950}
                fontSize="4.5rem"
                lineHeight={1}
                sx={{
                  mt: 3,
                  letterSpacing: "-.06em",
                }}
              >
                92%
              </Typography>


              <Typography
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                Excellent Resume Quality
              </Typography>


              <LinearProgress
                variant="determinate"
                value={92}
                sx={{
                  mt: 3,
                  height: 9,
                  borderRadius: 10,
                  background:
                    "rgba(255,255,255,.2)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 10,
                    background: "#FFFFFF",
                  },
                }}
              />


              <Button
                variant="contained"
                onClick={goToResumeAnalyzer}
                startIcon={
                  <DescriptionRoundedIcon />
                }
                sx={{
                  mt: 3,
                  background: "#FFFFFF",
                  color: "#059669",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                  "&:hover": {
                    background: "#F0FDF4",
                  },
                }}
              >
                Improve Resume
              </Button>

            </Paper>

          </Grid>


          {/* Profile Completion */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <DashboardCard>

              <Box sx={{ p: 4 }}>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Box>

                    <Typography
                      fontWeight={900}
                      fontSize="1.3rem"
                    >
                      Profile Completion
                    </Typography>


                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ mt: .5 }}
                    >
                      Complete your profile to
                      increase recruiter visibility.
                    </Typography>

                  </Box>


                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border:
                        "6px solid #DBEAFE",
                      color: "#2563EB",
                      fontWeight: 900,
                    }}
                  >
                    85%
                  </Box>

                </Stack>


                <Box sx={{ mt: 4 }}>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >

                    <Typography
                      fontSize=".85rem"
                      fontWeight={700}
                    >
                      Profile strength
                    </Typography>


                    <Typography
                      fontSize=".85rem"
                      fontWeight={800}
                      color="#2563EB"
                    >
                      85%
                    </Typography>

                  </Stack>


                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: 10,
                      borderRadius: 10,
                      background: "#E2E8F0",
                      "& .MuiLinearProgress-bar":
                        {
                          borderRadius: 10,
                          background:
                            "linear-gradient(90deg,#2563EB,#7C3AED)",
                        },
                    }}
                  />

                </Box>


                <Stack
                  spacing={1.3}
                  sx={{ mt: 3 }}
                >

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: "#10B981",
                      }}
                    />

                    <Typography
                      variant="body2"
                    >
                      Basic information completed
                    </Typography>
                  </Stack>


                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: "#10B981",
                      }}
                    />

                    <Typography
                      variant="body2"
                    >
                      Skills added
                    </Typography>
                  </Stack>


                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <AccessTimeRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: "#F59E0B",
                      }}
                    />

                    <Typography
                      variant="body2"
                    >
                      Add projects and certifications
                    </Typography>
                  </Stack>

                </Stack>


                <Button
                  variant="contained"
                  onClick={goToProfile}
                  fullWidth
                  sx={{
                    mt: 3,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 800,
                  }}
                >
                  Complete Profile
                </Button>

              </Box>

            </DashboardCard>

          </Grid>

        </Grid>


        {/* ==================================================
            INTERVIEWS
        ================================================== */}

        <Box sx={{ mt: 5 }}>

          <SectionTitle
            title="Upcoming Interviews"
            subtitle="Stay prepared for your upcoming opportunities"
            action="Open Calendar"
            onAction={goToCalendar}
          />


          <Grid
            container
            spacing={3}
          >

            {upcomingInterviews.map(
              (interview) => (
                <Grid
                  key={`${interview.company}-${interview.date}`}
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >

                  <DashboardCard>

                    <Box sx={{ p: 3 }}>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >

                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >

                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: 3,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "#EFF6FF",
                              color: "#2563EB",
                            }}
                          >
                            <BusinessCenterRoundedIcon />
                          </Box>


                          <Box>

                            <Typography
                              fontWeight={900}
                            >
                              {interview.company}
                            </Typography>


                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {interview.role}
                            </Typography>

                          </Box>

                        </Stack>


                        <Chip
                          icon={
                            <EventAvailableRoundedIcon />
                          }
                          label="Upcoming"
                          size="small"
                          sx={{
                            background:
                              "#ECFDF5",
                            color: "#059669",
                            fontWeight: 800,
                          }}
                        />

                      </Stack>


                      <Divider
                        sx={{ my: 2.5 }}
                      />


                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        spacing={2}
                      >

                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >

                          <CalendarMonthRoundedIcon
                            sx={{
                              color: "#64748B",
                              fontSize: 20,
                            }}
                          />

                          <Typography
                            fontWeight={700}
                            fontSize=".9rem"
                          >
                            {interview.date}
                          </Typography>

                        </Stack>


                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >

                          <AccessTimeRoundedIcon
                            sx={{
                              color: "#64748B",
                              fontSize: 20,
                            }}
                          />

                          <Typography
                            fontWeight={700}
                            fontSize=".9rem"
                          >
                            {interview.time}
                          </Typography>

                        </Stack>

                      </Stack>

                    </Box>

                  </DashboardCard>

                </Grid>
              )
            )}

          </Grid>

        </Box>


        {/* ==================================================
            RECENT ACTIVITY
        ================================================== */}

        <Box sx={{ mt: 5 }}>

          <DashboardCard>

            <Box sx={{ p: 4 }}>

              <SectionTitle
                title="Recent Activity"
                subtitle="Your latest career activity"
              />


              <Stack spacing={0}>

                {activities.map(
                  (activity, index) => (
                    <Box key={activity.text}>

                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{
                          py: 2,
                        }}
                      >

                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            minWidth: 42,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "#EFF6FF",
                            color: "#2563EB",
                          }}
                        >
                          {activity.icon}
                        </Box>


                        <Box
                          sx={{
                            flex: 1,
                          }}
                        >

                          <Typography
                            fontWeight={700}
                            fontSize=".92rem"
                          >
                            {activity.text}
                          </Typography>


                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {activity.time}
                          </Typography>

                        </Box>


                        <CheckCircleRoundedIcon
                          sx={{
                            color: "#10B981",
                            fontSize: 20,
                          }}
                        />

                      </Stack>


                      {index !==
                        activities.length - 1 && (
                        <Divider />
                      )}

                    </Box>
                  )
                )}

              </Stack>

            </Box>

          </DashboardCard>

        </Box>


        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: {
              xs: 3,
              md: 4,
            },
            borderRadius: 5,
            color: "#FFFFFF",
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            boxShadow:
              "0 20px 50px rgba(15,23,42,.15)",
          }}
        >

          <Grid
            container
            spacing={3}
            alignItems="center"
          >

            <Grid
              size={{
                xs: 12,
                md: 5,
              }}
            >

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >

                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(255,255,255,.1)",
                  }}
                >
                  <RocketLaunchRoundedIcon />
                </Box>


                <Box>

                  <Typography
                    fontWeight={900}
                    fontSize="1.35rem"
                  >
                    Ready for your next opportunity?
                  </Typography>


                  <Typography
                    variant="body2"
                    sx={{
                      mt: .5,
                      color:
                        "rgba(255,255,255,.65)",
                    }}
                  >
                    Take the next step in your
                    career journey.
                  </Typography>

                </Box>

              </Stack>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 7,
              }}
            >

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={1.5}
                justifyContent={{
                  xs: "flex-start",
                  md: "flex-end",
                }}
              >

                <Button
                  variant="contained"
                  onClick={goToJobs}
                  startIcon={
                    <WorkRoundedIcon />
                  }
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 800,
                    background:
                      "#FFFFFF",
                    color: "#0F172A",
                    "&:hover": {
                      background: "#F8FAFC",
                    },
                  }}
                >
                  Browse Jobs
                </Button>


                <Button
                  variant="outlined"
                  onClick={goToResumeAnalyzer}
                  startIcon={
                    <UploadFileRoundedIcon />
                  }
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    borderColor:
                      "rgba(255,255,255,.35)",
                    "&:hover": {
                      borderColor: "#FFFFFF",
                      background:
                        "rgba(255,255,255,.06)",
                    },
                  }}
                >
                  Resume Analyzer
                </Button>


                <Button
                  variant="outlined"
                  onClick={goToApplications}
                  startIcon={
                    <BusinessCenterRoundedIcon />
                  }
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    borderColor:
                      "rgba(255,255,255,.35)",
                    "&:hover": {
                      borderColor: "#FFFFFF",
                      background:
                        "rgba(255,255,255,.06)",
                    },
                  }}
                >
                  Applications
                </Button>

              </Stack>

            </Grid>

          </Grid>

        </Paper>


        {/* ==================================================
            FOOTER SPACE
        ================================================== */}

        <Box
          sx={{
            height: 20,
          }}
        />

      </Container>
    </Box>
  );
};


export default StudentDashboard;