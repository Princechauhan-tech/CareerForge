import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { motion } from "framer-motion";

import HeroImage from "../../assets/images/hero.svg";

const Hero = () => {
  const popularTags = [
    "Frontend",
    "React",
    "UI/UX",
    "Remote",
    "Internship",
    "Marketing",
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",

        background:
          "linear-gradient(135deg, #ffffff 0%, #f7f3ff 50%, #eef5ff 100%)",

        minHeight: {
          xs: "auto",
          lg: "100vh",
        },

        display: "flex",
        alignItems: "center",

        py: {
          xs: 4,
          sm: 5,
          md: 7,
          lg: 4,
        },
      }}
    >
      {/* =====================================================
          BACKGROUND GLOW - TOP RIGHT
      ====================================================== */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 280,
            sm: 400,
            md: 550,
            lg: 650,
          },

          height: {
            xs: 280,
            sm: 400,
            md: 550,
            lg: 650,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(124,58,237,.14), transparent 70%)",

          top: {
            xs: -160,
            sm: -180,
            md: -200,
          },

          right: {
            xs: -180,
            sm: -150,
            md: -120,
          },

          filter: {
            xs: "blur(25px)",
            md: "blur(40px)",
          },

          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          BACKGROUND GLOW - BOTTOM LEFT
      ====================================================== */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 250,
            sm: 350,
            md: 500,
          },

          height: {
            xs: 250,
            sm: 350,
            md: 500,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(37,99,235,.11), transparent 70%)",

          bottom: {
            xs: -150,
            md: -180,
          },

          left: {
            xs: -150,
            md: -100,
          },

          filter: {
            xs: "blur(25px)",
            md: "blur(40px)",
          },

          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          position: "relative",
          zIndex: 1,

          width: "100%",
          maxWidth: "100% !important",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 6,
          },

          boxSizing: "border-box",
        }}
      >
        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,

            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              lg: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
            },

            gap: {
              xs: 5,
              sm: 6,
              md: 7,
              lg: 3,
              xl: 6,
            },

            alignItems: "center",

            minHeight: {
              lg: "90vh",
            },
          }}
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: {
                xs: "100%",
                lg: 680,
              },

              mx: {
                xs: "auto",
                lg: 0,
              },

              textAlign: {
                xs: "center",
                lg: "left",
              },

              order: {
                xs: 1,
                lg: 1,
              },

              overflow: "visible",
            }}
          >
            {/* =================================================
                BADGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",

                  maxWidth: "100%",

                  px: {
                    xs: 1.3,
                    sm: 2,
                  },

                  py: {
                    xs: 0.7,
                    sm: 1,
                  },

                  borderRadius: 100,

                  background:
                    "rgba(124,58,237,.08)",

                  border:
                    "1px solid rgba(124,58,237,.15)",

                  mb: {
                    xs: 2.5,
                    sm: 3,
                  },

                  boxSizing: "border-box",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,

                    color: "#6d28d9",

                    fontSize: {
                      xs: "0.68rem",
                      sm: "0.78rem",
                      md: "0.9rem",
                    },

                    lineHeight: 1.3,

                    whiteSpace: {
                      xs: "normal",
                      sm: "nowrap",
                    },
                  }}
                >
                  🚀 India's Most Trusted Career Platform
                </Typography>
              </Box>
            </motion.div>

            {/* =================================================
                HEADING
            ================================================== */}

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
                duration: 0.7,
                delay: 0.1,
              }}
            >
              <Typography
                component="h1"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: 0,

                  fontWeight: 800,

                  color: "#111827",

                  lineHeight: {
                    xs: 1.08,
                    sm: 1.05,
                    md: 1.02,
                  },

                  letterSpacing: {
                    xs: "-1.2px",
                    sm: "-1.8px",
                    md: "-2.5px",
                  },

                  fontSize: {
                    xs: "clamp(2rem, 10vw, 2.55rem)",
                    sm: "clamp(2.6rem, 7vw, 3.6rem)",
                    md: "clamp(3.4rem, 6vw, 4.5rem)",
                    lg: "4.5rem",
                    xl: "5.2rem",
                  },

                  mb: {
                    xs: 2.5,
                    sm: 3,
                  },

                  overflowWrap: "break-word",
                  wordBreak: "normal",
                }}
              >
                Find Jobs That
                <br />
                Shape Your
                <br />

                <Box
                  component="span"
                  sx={{
                    display: "inline",

                    background:
                      "linear-gradient(90deg,#2563eb,#7c3aed,#ec4899)",

                    WebkitBackgroundClip:
                      "text",

                    WebkitTextFillColor:
                      "transparent",

                    backgroundClip: "text",
                  }}
                >
                  Future Career
                </Box>
              </Typography>
            </motion.div>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: 520,
                    lg: 620,
                  },

                  mx: {
                    xs: "auto",
                    lg: 0,
                  },

                  color: "#64748b",

                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.1rem",
                  },

                  lineHeight: {
                    xs: 1.55,
                    sm: 1.6,
                    md: 1.65,
                  },

                  mb: {
                    xs: 3,
                    sm: 4,
                  },
                }}
              >
                Explore thousands of jobs, internships and
                opportunities from top companies. Build skills,
                connect with recruiters and grow your career
                faster.
              </Typography>
            </motion.div>

            {/* =====================================================
                SEARCH BOX
            ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              style={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 700,
                  minWidth: 0,

                  mx: {
                    xs: "auto",
                    lg: 0,
                  },

                  boxSizing: "border-box",

                  display: "flex",

                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },

                  gap: {
                    xs: 1,
                    sm: 1.2,
                  },

                  p: {
                    xs: 1,
                    sm: 1.2,
                  },

                  borderRadius: {
                    xs: 3,
                    sm: 4,
                    md: 5,
                  },

                  background:
                    "rgba(255,255,255,.92)",

                  backdropFilter:
                    "blur(20px)",

                  border:
                    "1px solid rgba(124,58,237,.08)",

                  boxShadow:
                    "0 25px 60px rgba(0,0,0,.08)",
                }}
              >
                {/* JOB INPUT */}

                <TextField
                  fullWidth
                  placeholder="Job title, keyword or skill"
                  size="medium"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon
                            sx={{
                              color: "#64748b",
                              fontSize: 20,
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    minWidth: 0,

                    flex: {
                      md: 1,
                    },

                    "& .MuiOutlinedInput-root": {
                      width: "100%",
                      height: {
                        xs: 50,
                        sm: 54,
                        md: 56,
                      },

                      borderRadius: 3,

                      background: "#fafafa",

                      boxSizing: "border-box",

                      "& fieldset": {
                        borderColor:
                          "rgba(148,163,184,.18)",
                      },

                      "&:hover fieldset": {
                        borderColor:
                          "rgba(124,58,237,.3)",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor:
                          "#7c3aed",
                      },
                    },

                    "& .MuiInputBase-input": {
                      minWidth: 0,

                      fontSize: {
                        xs: "0.82rem",
                        sm: "0.9rem",
                      },
                    },
                  }}
                />

                {/* LOCATION */}

                <TextField
                  fullWidth
                  placeholder="Location"
                  size="medium"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnRoundedIcon
                            sx={{
                              color: "#64748b",
                              fontSize: 20,
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    minWidth: 0,

                    width: {
                      xs: "100%",
                      md: 170,
                    },

                    "& .MuiOutlinedInput-root": {
                      width: "100%",

                      height: {
                        xs: 50,
                        sm: 54,
                        md: 56,
                      },

                      borderRadius: 3,

                      background: "#fafafa",

                      boxSizing: "border-box",

                      "& fieldset": {
                        borderColor:
                          "rgba(148,163,184,.18)",
                      },

                      "&:hover fieldset": {
                        borderColor:
                          "rgba(124,58,237,.3)",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor:
                          "#7c3aed",
                      },
                    },
                  }}
                />

                {/* SEARCH BUTTON */}

                <Button
                  variant="contained"
                  fullWidth
                  endIcon={
                    <ArrowForwardRoundedIcon />
                  }
                  sx={{
                    flexShrink: 0,

                    width: {
                      xs: "100%",
                      md: 165,
                    },

                    minWidth: 0,

                    height: {
                      xs: 50,
                      sm: 54,
                      md: 56,
                    },

                    borderRadius: 3,

                    textTransform: "none",

                    fontWeight: 700,

                    fontSize: {
                      xs: "0.88rem",
                      sm: "0.95rem",
                    },

                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",

                    boxShadow:
                      "0 15px 35px rgba(124,58,237,.25)",

                    transition:
                      "all .25s ease",

                    "&:hover": {
                      transform:
                        "translateY(-2px)",

                      background:
                        "linear-gradient(135deg,#1d4ed8,#6d28d9)",
                    },
                  }}
                >
                  Search Jobs
                </Button>
              </Box>
            </motion.div>

            {/* =====================================================
                POPULAR TAGS
            ====================================================== */}

            <Stack
              direction="row"
              spacing={0.8}
              useFlexGap
              flexWrap="wrap"
              justifyContent={{
                xs: "center",
                lg: "flex-start",
              }}
              sx={{
                width: "100%",

                mt: 2,

                mx: {
                  xs: "auto",
                  lg: 0,
                },
              }}
            >
              {popularTags.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  clickable
                  sx={{
                    height: {
                      xs: 30,
                      sm: 34,
                    },

                    borderRadius: 2,

                    fontWeight: 600,

                    fontSize: {
                      xs: "0.68rem",
                      sm: "0.78rem",
                    },

                    background:
                      "rgba(255,255,255,.85)",

                    border:
                      "1px solid rgba(148,163,184,.18)",

                    "&:hover": {
                      background:
                        "rgba(124,58,237,.08)",

                      borderColor:
                        "rgba(124,58,237,.2)",
                    },
                  }}
                />
              ))}
            </Stack>

            {/* =====================================================
                STATS
            ====================================================== */}

            <Box
              sx={{
                width: "100%",

                display: "grid",

                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(4, minmax(0, 1fr))",
                },

                gap: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },

                mt: {
                  xs: 4,
                  sm: 5,
                },
              }}
            >
              {/* STAT */}

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 24,
                      sm: 28,
                      md: 30,
                    },

                    fontWeight: 800,

                    color: "#111827",

                    lineHeight: 1,
                  }}
                >
                  50K+
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,

                    color: "#64748b",

                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.8rem",
                    },
                  }}
                >
                  Students
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 24,
                      sm: 28,
                      md: 30,
                    },

                    fontWeight: 800,

                    color: "#111827",

                    lineHeight: 1,
                  }}
                >
                  10K+
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,

                    color: "#64748b",

                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.8rem",
                    },
                  }}
                >
                  Jobs
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 24,
                      sm: 28,
                      md: 30,
                    },

                    fontWeight: 800,

                    color: "#111827",

                    lineHeight: 1,
                  }}
                >
                  500+
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,

                    color: "#64748b",

                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.8rem",
                    },
                  }}
                >
                  Companies
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 24,
                      sm: 28,
                      md: 30,
                    },

                    fontWeight: 800,

                    color: "#111827",

                    lineHeight: 1,
                  }}
                >
                  98%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,

                    color: "#64748b",

                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.8rem",
                    },
                  }}
                >
                  Success Rate
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* =====================================================
              RIGHT HERO IMAGE
          ====================================================== */}

          <Box
            sx={{
              position: "relative",

              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              minHeight: {
                xs: 280,
                sm: 350,
                md: 470,
                lg: 620,
                xl: 680,
              },

              display: "flex",

              alignItems: "center",
              justifyContent: "center",

              overflow: "hidden",

              order: {
                xs: 2,
                lg: 2,
              },

              mt: {
                xs: 1,
                sm: 2,
                lg: 0,
              },
            }}
          >
            {/* =================================================
                IMAGE GLOW
            ================================================== */}

            <Box
              sx={{
                position: "absolute",

                width: {
                  xs: 240,
                  sm: 320,
                  md: 430,
                  lg: 550,
                  xl: 620,
                },

                height: {
                  xs: 240,
                  sm: 320,
                  md: 430,
                  lg: 550,
                  xl: 620,
                },

                maxWidth: "90%",

                borderRadius: "50%",

                background:
                  "linear-gradient(135deg,#7c3aed22,#2563eb22)",

                filter: {
                  xs: "blur(45px)",
                  md: "blur(75px)",
                },
              }}
            />

            {/* =================================================
                DASHED CIRCLE
            ================================================== */}

            <Box
              sx={{
                position: "absolute",

                width: {
                  xs: 220,
                  sm: 290,
                  md: 400,
                  lg: 500,
                  xl: 570,
                },

                height: {
                  xs: 220,
                  sm: 290,
                  md: 400,
                  lg: 500,
                  xl: 570,
                },

                maxWidth: "85%",
                maxHeight: "85%",

                borderRadius: "50%",

                border:
                  "2px dashed rgba(124,58,237,.25)",

                animation:
                  "heroSpin 25s linear infinite",

                "@keyframes heroSpin": {
                  from: {
                    transform: "rotate(0deg)",
                  },

                  to: {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            />

            {/* =================================================
                HERO IMAGE
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "relative",
                zIndex: 2,

                width: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={HeroImage}
                alt="Career Hero"
                sx={{
                  display: "block",

                  width: {
                    xs: 270,
                    sm: 340,
                    md: 450,
                    lg: 560,
                    xl: 630,
                  },

                  maxWidth: "88%",

                  height: "auto",

                  objectFit: "contain",

                  filter:
                    "drop-shadow(0 30px 50px rgba(0,0,0,.15))",
                }}
              />
            </motion.div>

            {/* =================================================
                FLOATING CARD 1
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "12%",
                left: "2%",
                zIndex: 5,
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },

                  p: 2,

                  minWidth: 145,

                  borderRadius: 4,

                  background: "#fff",

                  boxShadow:
                    "0 20px 40px rgba(0,0,0,.08)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  10,000+
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 13,
                    color: "#64748b",
                  }}
                >
                  Active Jobs
                </Typography>
              </Box>
            </motion.div>

            {/* =================================================
                FLOATING CARD 2
            ================================================== */}

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "25%",
                right: "2%",
                zIndex: 5,
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },

                  p: 2,

                  minWidth: 140,

                  borderRadius: 4,

                  background: "#fff",

                  boxShadow:
                    "0 20px 40px rgba(0,0,0,.08)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#16a34a",
                  }}
                >
                  +48%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 13,
                    color: "#64748b",
                  }}
                >
                  Career Growth
                </Typography>
              </Box>
            </motion.div>

            {/* =================================================
                FLOATING CARD 3
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                bottom: "13%",
                right: "3%",
                zIndex: 5,
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },

                  p: 2,

                  minWidth: 145,

                  borderRadius: 4,

                  background: "#fff",

                  boxShadow:
                    "0 20px 40px rgba(0,0,0,.08)",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <AutoAwesomeRoundedIcon
                    sx={{
                      color: "#ec4899",
                      fontSize: 22,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    92%
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 13,
                    color: "#64748b",
                  }}
                >
                  Resume Score
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;