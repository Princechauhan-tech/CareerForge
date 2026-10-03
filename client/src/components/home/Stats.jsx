import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

const stats = [
  {
    number: "10K+",
    title: "Students",
    icon: PeopleAltRoundedIcon,
  },
  {
    number: "500+",
    title: "Companies",
    icon: BusinessRoundedIcon,
  },
  {
    number: "5K+",
    title: "Jobs Posted",
    icon: WorkRoundedIcon,
  },
  {
    number: "98%",
    title: "Success Rate",
    icon: EmojiEventsRoundedIcon,
  },
];

const Stats = () => {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 8,
          sm: 10,
          md: 12,
        },

        background:
          "linear-gradient(135deg,#0F172A 0%,#172554 50%,#1E3A8A 100%)",

        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.18)",
          filter: "blur(80px)",
          top: -150,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.18)",
          filter: "blur(80px)",
          bottom: -180,
          right: -100,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
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

                background:
                  "rgba(255,255,255,0.1)",

                border:
                  "1px solid rgba(255,255,255,0.15)",

                color: "#93C5FD",

                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              CAREERFORGE IMPACT
            </Typography>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                color: "#FFFFFF",

                fontSize: {
                  xs: "2rem",
                  sm: "2.6rem",
                  md: "3.2rem",
                },

                letterSpacing: "-1px",
              }}
            >
              CareerForge In Numbers
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 650,
                mx: "auto",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,

                fontSize: {
                  xs: "0.95rem",
                  md: "1.05rem",
                },
              }}
            >
              Thousands of students and companies are already
              building better career connections with CareerForge.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },

            gap: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    textAlign: "center",

                    p: {
                      xs: 2.5,
                      sm: 3.5,
                      md: 4,
                    },

                    borderRadius: 5,

                    background:
                      "rgba(255,255,255,0.08)",

                    backdropFilter: "blur(15px)",

                    border:
                      "1px solid rgba(255,255,255,0.12)",

                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.15)",

                    transition:
                      "all 0.3s ease",

                    "&:hover": {
                      background:
                        "rgba(255,255,255,0.12)",

                      borderColor:
                        "rgba(147,197,253,0.4)",

                      boxShadow:
                        "0 20px 50px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  {/* Icon */}

                  <Box
                    sx={{
                      width: 58,
                      height: 58,

                      mx: "auto",
                      mb: 2.5,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: 3,

                      background:
                        "linear-gradient(135deg,#2563EB,#7C3AED)",

                      color: "#FFFFFF",

                      boxShadow:
                        "0 10px 25px rgba(37,99,235,0.3)",
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 29,
                      }}
                    />
                  </Box>

                  {/* Number */}

                  <Typography
                    sx={{
                      fontWeight: 900,

                      fontSize: {
                        xs: "2rem",
                        sm: "2.5rem",
                        md: "3rem",
                      },

                      lineHeight: 1,

                      background:
                        "linear-gradient(90deg,#60A5FA,#C4B5FD)",

                      WebkitBackgroundClip:
                        "text",

                      WebkitTextFillColor:
                        "transparent",
                    }}
                  >
                    {item.number}
                  </Typography>

                  {/* Title */}

                  <Typography
                    sx={{
                      mt: 1.5,

                      color:
                        "rgba(255,255,255,0.75)",

                      fontWeight: 600,

                      fontSize: {
                        xs: "0.85rem",
                        sm: "0.95rem",
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;