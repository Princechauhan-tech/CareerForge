import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

import { motion } from "framer-motion";

const companies = [
  {
    name: "Google",
    logo: "G",
    jobs: 128,
    location: "Bangalore",
    industry: "Technology",
  },
  {
    name: "Microsoft",
    logo: "M",
    jobs: 96,
    location: "Hyderabad",
    industry: "Software",
  },
  {
    name: "Amazon",
    logo: "A",
    jobs: 142,
    location: "Pune",
    industry: "E-Commerce",
  },
  {
    name: "Meta",
    logo: "M",
    jobs: 54,
    location: "Remote",
    industry: "Social Media",
  },
  {
    name: "Netflix",
    logo: "N",
    jobs: 31,
    location: "Mumbai",
    industry: "Entertainment",
  },
  {
    name: "Adobe",
    logo: "A",
    jobs: 67,
    location: "Noida",
    industry: "Design",
  },
];

const Companies = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: "2.4rem",
                md: "4rem",
              },
              color: "#0F172A",
            }}
          >
            Top Hiring
          </Typography>

          <Typography
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: "2.4rem",
                md: "4rem",
              },
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Companies
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              mx: "auto",
              mt: 2,
              color: "#64748B",
              lineHeight: 1.8,
            }}
          >
            Explore opportunities from the world's
            leading companies and build your dream
            career with CareerForge.
          </Typography>
        </Box>

        {/* Company Cards */}
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} lg={4} key={company.name}>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                style={{
                  height: "100%",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 6,
                    background:
                      "rgba(255,255,255,.85)",
                    backdropFilter: "blur(20px)",
                    border:
                      "1px solid rgba(255,255,255,.7)",
                    boxShadow:
                      "0 20px 50px rgba(15,23,42,.08)",
                    overflow: "hidden",

                    "&:hover": {
                      boxShadow:
                        "0 25px 60px rgba(37,99,235,.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 6,
                      background:
                        "linear-gradient(90deg,#2563EB,#7C3AED)",
                    }}
                  />

                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={3}
                    >
                      <Avatar
                        sx={{
                          width: 65,
                          height: 65,
                          fontWeight: 900,
                          fontSize: 24,
                          background:
                            "linear-gradient(135deg,#2563EB,#7C3AED)",
                        }}
                      >
                        {company.logo}
                      </Avatar>

                      <Box>
                        <Typography
                          fontWeight={800}
                          fontSize="1.2rem"
                        >
                          {company.name}
                        </Typography>

                        <Typography color="text.secondary">
                          {company.location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Chip
                      label={company.industry}
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        background:
                          "rgba(37,99,235,.1)",
                        color: "#2563EB",
                      }}
                    />

                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.8,
                        mb: 3,
                      }}
                    >
                      Explore exciting opportunities,
                      internships, and full-time roles
                      available at {company.name}.
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          fontWeight={800}
                          fontSize="1.4rem"
                        >
                          {company.jobs}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Open Jobs
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 3,
                          px: 3,
                          py: 1,
                          fontWeight: 700,
                          background:
                            "linear-gradient(135deg,#2563EB,#7C3AED)",
                        }}
                      >
                        View Jobs
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Box
          sx={{
            mt: 10,
            p: {
              xs: 4,
              md: 6,
            },
            borderRadius: 6,
            background:
              "linear-gradient(135deg,#0F172A,#1E293B)",
            color: "#fff",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography
                fontWeight={900}
                fontSize="3rem"
              >
                500+
              </Typography>
              <Typography color="rgba(255,255,255,.7)">
                Partner Companies
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                fontWeight={900}
                fontSize="3rem"
              >
                10K+
              </Typography>
              <Typography color="rgba(255,255,255,.7)">
                Open Positions
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                fontWeight={900}
                fontSize="3rem"
              >
                50K+
              </Typography>
              <Typography color="rgba(255,255,255,.7)">
                Students Hired
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                fontWeight={900}
                fontSize="3rem"
              >
                98%
              </Typography>
              <Typography color="rgba(255,255,255,.7)">
                Success Rate
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Companies;