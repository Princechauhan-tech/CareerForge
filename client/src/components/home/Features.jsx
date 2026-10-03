import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

const features = [
  {
    icon: SearchRoundedIcon,
    title: "Smart Job Discovery",
    description:
      "Discover relevant jobs and career opportunities based on your skills, interests, and goals.",
  },
  {
    icon: WorkOutlineRoundedIcon,
    title: "Career Opportunities",
    description:
      "Explore opportunities from leading companies and take the next step in your professional journey.",
  },
  {
    icon: AutoAwesomeRoundedIcon,
    title: "Personalized Experience",
    description:
      "Get a career experience designed around your profile, preferences, and aspirations.",
  },
  {
    icon: NotificationsActiveRoundedIcon,
    title: "Real-Time Notifications",
    description:
      "Stay updated with applications, interviews, and important career events in real time.",
  },
  {
    icon: TrendingUpRoundedIcon,
    title: "Track Your Progress",
    description:
      "Keep track of your applications, interviews, and career progress from one place.",
  },
  {
    icon: SecurityRoundedIcon,
    title: "Secure & Reliable",
    description:
      "Your account and career information are protected with a secure and reliable platform.",
  },
];

const Features = () => {
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
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
              WHY CAREERFORGE?
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
              Everything You Need
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
                To Build Your Career
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 680,
                mx: "auto",
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "1.1rem",
                },
                lineHeight: 1.7,
              }}
            >
              CareerForge brings opportunities, applications,
              interviews, and career growth together in one
              powerful platform.
            </Typography>
          </Box>
        </motion.div>

        {/* Feature Cards */}

        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Grid
                key={feature.title}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  style={{
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: {
                        xs: 3,
                        sm: 3.5,
                        md: 4,
                      },

                      borderRadius: 5,

                      background:
                        "linear-gradient(145deg,#FFFFFF,#F8FAFC)",

                      border:
                        "1px solid #E2E8F0",

                      boxShadow:
                        "0 10px 35px rgba(15,23,42,0.06)",

                      transition:
                        "all 0.3s ease",

                      "&:hover": {
                        borderColor: "#BFDBFE",

                        boxShadow:
                          "0 20px 50px rgba(37,99,235,0.12)",
                      },
                    }}
                  >
                    {/* Icon */}

                    <Box
                      sx={{
                        width: 58,
                        height: 58,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        borderRadius: 3,

                        background:
                          "linear-gradient(135deg,#EEF4FF,#E0E7FF)",

                        color: "#2563EB",

                        mb: 3,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 30,
                        }}
                      />
                    </Box>

                    {/* Title */}

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{
                        color: "#0F172A",
                        mb: 1.2,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    {/* Description */}

                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      {feature.description}
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

export default Features;