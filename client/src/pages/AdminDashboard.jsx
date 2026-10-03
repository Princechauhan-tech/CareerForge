import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
const stats = [
  {
    title: "Total Users",
    value: "12,458",
    icon: <PeopleRoundedIcon />,
  },
  {
    title: "Companies",
    value: "542",
    icon: <BusinessRoundedIcon />,
  },
  {
    title: "Jobs Posted",
    value: "8,721",
    icon: <WorkRoundedIcon />,
  },
  {
    title: "Growth",
    value: "+24%",
    icon: <TrendingUpRoundedIcon />,
  },
];

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC,#EEF4FF)",
        py: 5,
      }}
    >
      <Container maxWidth="xl">

        {/* Hero */}

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 6,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Typography
            fontWeight={900}
            fontSize="2.5rem"
          >
            Admin Control Center
          </Typography>

          <Typography
            sx={{
              opacity: .8,
              mt: 1,
            }}
          >
            Manage users, companies, jobs,
            reports and platform analytics.
          </Typography>
        </Paper>

        {/* Stats */}

        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.title}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 5,
                  background: "#fff",
                  boxShadow:
                    "0 15px 35px rgba(15,23,42,.06)",
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
                      fontSize="2rem"
                      fontWeight={900}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  {item.icon}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
                {/* Users + Companies */}

        <Grid
          container
          spacing={4}
          sx={{ mt: 1 }}
        >
          {/* Recent Users */}

          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 35px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Recent Users
              </Typography>

              {[
                "Aman Sharma",
                "Rahul Kumar",
                "Priya Singh",
                "Ankit Verma",
              ].map((user) => (
                <Box
                  key={user}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    background: "#F8FAFC",
                    border:
                      "1px solid #E2E8F0",
                  }}
                >
                  <Typography
                    fontWeight={700}
                  >
                    {user}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    Student Account
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Companies */}

          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 35px rgba(15,23,42,.06)",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                New Companies
              </Typography>

              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Adobe",
              ].map((company) => (
                <Box
                  key={company}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 3,
                    background: "#F8FAFC",
                    border:
                      "1px solid #E2E8F0",
                  }}
                >
                  <Typography
                    fontWeight={700}
                  >
                    {company}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    Verified Company
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Latest Jobs */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 5,
            background: "#fff",
            boxShadow:
              "0 15px 35px rgba(15,23,42,.06)",
          }}
        >
          <Typography
            fontWeight={800}
            fontSize="1.4rem"
            mb={3}
          >
            Latest Jobs Posted
          </Typography>

          {[
            {
              title:
                "Senior Frontend Developer",
              company: "Google",
            },
            {
              title:
                "Backend Engineer",
              company: "Microsoft",
            },
            {
              title:
                "Full Stack Developer",
              company: "Amazon",
            },
          ].map((job) => (
            <Box
              key={job.title}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                background: "#F8FAFC",
                border:
                  "1px solid #E2E8F0",
              }}
            >
              <Typography
                fontWeight={700}
              >
                {job.title}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {job.company}
              </Typography>
            </Box>
          ))}
        </Paper>
                {/* Analytics + Reports */}

        <Grid
          container
          spacing={4}
          sx={{ mt: 1 }}
        >
          {/* Platform Analytics */}

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background:
                  "linear-gradient(135deg,#2563EB,#7C3AED)",
                color: "#fff",
                height: "100%",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Platform Analytics
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography
                    fontWeight={900}
                    fontSize="2rem"
                  >
                    85%
                  </Typography>

                  <Typography>
                    User Engagement
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    fontWeight={900}
                    fontSize="2rem"
                  >
                    74%
                  </Typography>

                  <Typography>
                    Application Success Rate
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    fontWeight={900}
                    fontSize="2rem"
                  >
                    +32%
                  </Typography>

                  <Typography>
                    Monthly Growth
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Reports */}

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 5,
                background: "#fff",
                boxShadow:
                  "0 15px 35px rgba(15,23,42,.06)",
                height: "100%",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize="1.4rem"
                mb={3}
              >
                Reports Overview
              </Typography>

              {[
                "12 New User Reports",
                "4 Company Verification Requests",
                "8 Job Approval Requests",
                "2 Security Alerts",
              ].map((report) => (
                <Box
                  key={report}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    background: "#F8FAFC",
                    border:
                      "1px solid #E2E8F0",
                  }}
                >
                  <Typography>
                    {report}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Moderation Panel */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 5,
            background: "#fff",
            boxShadow:
              "0 15px 35px rgba(15,23,42,.06)",
          }}
        >
          <Typography
            fontWeight={800}
            fontSize="1.4rem"
            mb={3}
          >
            Moderation Panel
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "#F8FAFC",
                }}
              >
                <Typography
                  fontWeight={900}
                  fontSize="2rem"
                >
                  32
                </Typography>

                <Typography>
                  Pending Approvals
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "#F8FAFC",
                }}
              >
                <Typography
                  fontWeight={900}
                  fontSize="2rem"
                >
                  18
                </Typography>

                <Typography>
                  Reported Jobs
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "#F8FAFC",
                }}
              >
                <Typography
                  fontWeight={900}
                  fontSize="2rem"
                >
                  9
                </Typography>

                <Typography>
                  Security Alerts
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Actions */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Typography
            fontWeight={800}
            fontSize="1.5rem"
            mb={3}
          >
            Quick Admin Actions
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Manage Users
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Verify Companies
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Review Jobs
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              View Reports
            </Button>
          </Stack>
        </Paper>

      </Container>
    </Box>
  );
};

export default AdminDashboard;