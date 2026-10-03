import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { motion } from "framer-motion";

const steps = [
  {
    icon: SearchRoundedIcon,
    number: "01",
    title: "Discover Opportunities",
    description:
      "Browse thousands of verified jobs, internships and opportunities from top companies.",
    color: "#2563EB",
  },
  {
    icon: DescriptionRoundedIcon,
    number: "02",
    title: "Build Your Profile",
    description:
      "Create a professional profile and showcase your skills, projects and achievements.",
    color: "#7C3AED",
  },
  {
    icon: WorkRoundedIcon,
    number: "03",
    title: "Apply Instantly",
    description:
      "Submit applications quickly and connect directly with recruiters and employers.",
    color: "#EC4899",
  },
  {
    icon: TrendingUpRoundedIcon,
    number: "04",
    title: "Grow Your Career",
    description:
      "Track applications, get interview updates and achieve your career goals faster.",
    color: "#10B981",
  },
];

const HowItWorks = () => {
  return (
    <Box
      sx={{
        py: {
          xs: 8,
          md: 12,
        },
        background:
          "linear-gradient(180deg,#ffffff 0%,#f8faff 100%)",
      }}
    >
      <Container maxWidth="xl">
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
                md: 10,
              },
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.8,
                borderRadius: 10,
                background: "#EEF4FF",
                color: "#2563EB",
                fontWeight: 700,
                fontSize: "0.85rem",
                mb: 2,
              }}
            >
              HOW IT WORKS
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.15,
                fontSize: {
                  xs: "2rem",
                  sm: "2.6rem",
                  md: "3.4rem",
                },
              }}
            >
              Your Career Journey
              <br />

              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg,#2563EB,#7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                In Four Simple Steps
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 2,
                color: "#64748B",
                lineHeight: 1.8,
                fontSize: {
                  xs: "0.95rem",
                  md: "1.05rem",
                },
              }}
            >
              Everything you need to discover opportunities,
              apply confidently and grow your professional
              career.
            </Typography>
          </Box>
        </motion.div>

        {/* Steps */}

        <Grid container spacing={4}>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={step.title}
              >
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
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      p: 4,
                      borderRadius: 6,
                      background: "#fff",
                      border:
                        "1px solid rgba(226,232,240,.8)",
                      boxShadow:
                        "0 15px 40px rgba(15,23,42,.06)",
                      overflow: "hidden",

                      "&:hover": {
                        boxShadow:
                          "0 25px 60px rgba(37,99,235,.12)",
                      },
                    }}
                  >
                    {/* Number */}

                    <Typography
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        fontWeight: 800,
                        fontSize: "3rem",
                        color: "#F1F5F9",
                      }}
                    >
                      {step.number}
                    </Typography>

                    {/* Icon */}

                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${step.color}15`,
                        color: step.color,
                        mb: 3,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Box>

                    {/* Title */}

                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.25rem",
                        color: "#0F172A",
                        mb: 1.5,
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}

                    <Typography
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.8,
                        fontSize: "0.95rem",
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;