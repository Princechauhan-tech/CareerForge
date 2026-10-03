import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Avatar,
} from "@mui/material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const stats = [
  {
    title: "Active Jobs",
    value: "24",
    icon: WorkRoundedIcon,
  },
  {
    title: "Applications",
    value: "542",
    icon: PeopleRoundedIcon,
  },
  {
    title: "Profile Views",
    value: "3.2K",
    icon: VisibilityRoundedIcon,
  },
  {
    title: "Hiring Rate",
    value: "92%",
    icon: BusinessRoundedIcon,
  },
];

const CompanyDashboard = () => {
const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="xl">

        {/* HEADER */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            mb: 5,
            borderRadius: 6,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: {
                    xs: "2rem",
                    md: "3rem",
                  },
                }}
              >
                Company Dashboard 🚀
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  mb: 3,
                  opacity: .8,
                  maxWidth: 650,
                }}
              >
                Manage jobs, applicants and hiring
                activities from one centralized
                dashboard.
              </Typography>

              <Button
                startIcon={<AddRoundedIcon />}
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg,#2563EB,#7C3AED)",
                  borderRadius: 3,
                  fontWeight: 700,
                }}
              >
                Post New Job
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack alignItems="center">
                <Avatar
                  sx={{
                    width: 110,
                    height: 110,
                    fontSize: 40,
                    background:
                      "rgba(255,255,255,.12)",
                  }}
                >
                  <BusinessRoundedIcon
                    sx={{
                      fontSize: 55,
                    }}
                  />
                </Avatar>

                <Typography
                  mt={2}
                  fontWeight={800}
                >
                  Company Account
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* STATS */}

        <Grid container spacing={3}>
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                key={item.title}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 5,
                      background: "#fff",
                      boxShadow:
                        "0 15px 40px rgba(15,23,42,.06)",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          color="text.secondary"
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: "2rem",
                            mt: 1,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>

                      <Avatar
                        sx={{
                          bgcolor:
                            "rgba(37,99,235,.1)",
                          color: "#2563EB",
                        }}
                      >
                        <Icon />
                      </Avatar>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
                {/* JOBS + APPLICANTS */}

        <Grid
          container
          spacing={4}
          sx={{
            mt: 2,
          }}
        >
          {/* Recent Jobs */}

          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Recent Job Posts
              </Typography>

              {[
                {
                  title: "Frontend Developer",
                  applicants: 84,
                },
                {
                  title: "Backend Developer",
                  applicants: 56,
                },
                {
                  title: "UI/UX Designer",
                  applicants: 41,
                },
              ].map((job) => (
                <Paper
                  key={job.title}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    background: "#F8FAFC",
                    border:
                      "1px solid #E2E8F0",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        fontWeight={700}
                      >
                        {job.title}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        Active Job Posting
                      </Typography>
                    </Box>

                    <Typography
                      fontWeight={800}
                      color="#2563EB"
                    >
                      {job.applicants} Applicants
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Paper>
          </Grid>

          {/* Quick Actions */}

          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Quick Actions
              </Typography>

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                    onClick={() => navigate("/company/jobs/create")}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg,#2563EB,#7C3AED)",
                  }}
                >
                  Create Job
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  Manage Jobs
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  View Applicants
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Recent Applicants */}

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Recent Applicants
              </Typography>

              {[
                {
                  name: "Rahul Sharma",
                  role: "Frontend Developer",
                },
                {
                  name: "Priya Singh",
                  role: "UI/UX Designer",
                },
                {
                  name: "Aman Verma",
                  role: "Backend Developer",
                },
                {
                  name: "Sneha Patel",
                  role: "Full Stack Developer",
                },
              ].map((applicant) => (
                <Paper
                  key={applicant.name}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    background: "#F8FAFC",
                    border:
                      "1px solid #E2E8F0",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        fontWeight={700}
                      >
                        {applicant.name}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        Applied for{" "}
                        {applicant.role}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    >
                      View
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyDashboard;