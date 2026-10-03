import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
} from "@mui/material";

import {
  BusinessRounded,
  LocationOnRounded,
  WorkRounded,
  ArrowForwardRounded,
  AccessTimeRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

const jobs = [
  {
    company: "Google",
    title: "Frontend Developer",
    location: "Bangalore",
    salary: "₹12 LPA",
    type: "Full Time",
  },
  {
    company: "Microsoft",
    title: "Backend Developer",
    location: "Hyderabad",
    salary: "₹15 LPA",
    type: "Remote",
  },
  {
    company: "Amazon",
    title: "Software Engineer",
    location: "Pune",
    salary: "₹18 LPA",
    type: "Full Time",
  },
];

const companyColors = {
  Google: "#4285F4",
  Microsoft: "#00A4EF",
  Amazon: "#FF9900",
};

const Jobs = () => {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 8,
          sm: 10,
          md: 12,
        },

        backgroundColor: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: {
                xs: 6,
                md: 8,
              },
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.7,
                mb: 2,
                borderRadius: 10,
                backgroundColor: "#EEF4FF",
                color: "#2563EB",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              FEATURED OPPORTUNITIES
            </Typography>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3.2rem",
                },

                color: "#0F172A",

                letterSpacing: "-1px",
              }}
            >
              Latest Job Openings
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 650,
                mx: "auto",
                lineHeight: 1.7,

                fontSize: {
                  xs: "0.95rem",
                  md: "1.05rem",
                },
              }}
            >
              Discover exciting career opportunities from
              leading companies and take the next step in your
              professional journey.
            </Typography>
          </Box>
        </motion.div>

        {/* Job Cards */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },

            gap: {
              xs: 3,
              md: 4,
            },
          }}
        >
          {jobs.map((job, index) => {
            const companyColor =
              companyColors[job.company] || "#2563EB";

            return (
              <motion.div
                key={job.title}
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
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -10,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    position: "relative",

                    p: {
                      xs: 3,
                      sm: 3.5,
                    },

                    borderRadius: 5,

                    background:
                      "linear-gradient(145deg,#FFFFFF,#F8FAFC)",

                    border:
                      "1px solid #E2E8F0",

                    boxShadow:
                      "0 12px 35px rgba(15,23,42,0.07)",

                    transition:
                      "all 0.3s ease",

                    overflow: "hidden",

                    "&:hover": {
                      borderColor: "#BFDBFE",

                      boxShadow:
                        "0 22px 50px rgba(37,99,235,0.14)",
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        `linear-gradient(90deg, ${companyColor}, #7C3AED)`,
                    },
                  }}
                >
                  {/* Company Header */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          borderRadius: 3,

                          background:
                            `${companyColor}15`,

                          color: companyColor,
                        }}
                      >
                        <BusinessRounded />
                      </Box>

                      <Box>
                        <Typography
                          fontWeight={800}
                          sx={{
                            color: "#0F172A",
                          }}
                        >
                          {job.company}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Verified Company
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: 34,
                        height: 34,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        borderRadius: "50%",

                        backgroundColor: "#F1F5F9",

                        color: "#64748B",
                      }}
                    >
                      <ArrowForwardRounded
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Job Title */}

                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      color: "#0F172A",
                      mb: 2,

                      fontSize: {
                        xs: "1.25rem",
                        sm: "1.35rem",
                      },
                    }}
                  >
                    {job.title}
                  </Typography>

                  {/* Job Details */}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.3,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,

                        color: "#64748B",
                      }}
                    >
                      <LocationOnRounded
                        sx={{
                          fontSize: 19,
                          color: "#2563EB",
                        }}
                      />

                      <Typography
                        variant="body2"
                        fontWeight={500}
                      >
                        {job.location}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,

                        color: "#64748B",
                      }}
                    >
                      <WorkRounded
                        sx={{
                          fontSize: 19,
                          color: "#2563EB",
                        }}
                      />

                      <Typography
                        variant="body2"
                        fontWeight={500}
                      >
                        {job.salary}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,

                        color: "#64748B",
                      }}
                    >
                      <AccessTimeRounded
                        sx={{
                          fontSize: 19,
                          color: "#2563EB",
                        }}
                      />

                      <Typography
                        variant="body2"
                        fontWeight={500}
                      >
                        Posted recently
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bottom */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Chip
                      label={job.type}
                      sx={{
                        fontWeight: 700,

                        backgroundColor:
                          job.type === "Remote"
                            ? "#ECFDF5"
                            : "#EEF4FF",

                        color:
                          job.type === "Remote"
                            ? "#059669"
                            : "#2563EB",

                        borderRadius: 2,
                      }}
                    />

                    <Button
                      variant="contained"
                      endIcon={
                        <ArrowForwardRounded />
                      }
                      sx={{
                        borderRadius: 3,

                        px: {
                          xs: 2,
                          sm: 2.5,
                        },

                        py: 1.1,

                        fontWeight: 700,

                        textTransform: "none",

                        background:
                          "linear-gradient(135deg,#2563EB,#1D4ED8)",

                        boxShadow:
                          "0 8px 20px rgba(37,99,235,0.25)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#1D4ED8,#1E40AF)",

                          boxShadow:
                            "0 12px 25px rgba(37,99,235,0.35)",
                        },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>

        {/* View All */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button
            variant="outlined"
            endIcon={<ArrowForwardRounded />}
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: 3,

              textTransform: "none",

              fontWeight: 700,

              borderWidth: "1.5px",

              "&:hover": {
                borderWidth: "1.5px",
              },
            }}
          >
            Explore All Jobs
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Jobs;