import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

import GoogleLogo from "../../assets/logos/google.png";
import MicrosoftLogo from "../../assets/logos/microsoft.png";
import AmazonLogo from "../../assets/logos/amazon.png";
import MetaLogo from "../../assets/logos/meta.png";
import NetflixLogo from "../../assets/logos/netflix.png";

const companies = [
  {
    name: "Google",
    logo: GoogleLogo,
  },
  {
    name: "Microsoft",
    logo: MicrosoftLogo,
  },
  {
    name: "Amazon",
    logo: AmazonLogo,
  },
  {
    name: "Meta",
    logo: MetaLogo,
  },
  {
    name: "Netflix",
    logo: NetflixLogo,
  },
];

const CompanySlider = () => {
  const sliderCompanies = [...companies, ...companies];

  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 7,
          sm: 8,
          md: 10,
        },
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EEF4FF 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            align="center"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              color: "#0F172A",
            }}
          >
            Trusted by Leading Companies
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{
              mt: 1.5,
              mb: 6,
              px: 2,
              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
                md: "1.1rem",
              },
            }}
          >
            Build your career with opportunities from the
            world's most innovative companies.
          </Typography>
        </motion.div>

        {/* Slider Wrapper */}
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            position: "relative",

            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: {
                xs: "30px",
                md: "100px",
              },
              zIndex: 2,
              background:
                "linear-gradient(90deg, #EEF4FF, transparent)",
              pointerEvents: "none",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: {
                xs: "30px",
                md: "100px",
              },
              zIndex: 2,
              background:
                "linear-gradient(270deg, #EEF4FF, transparent)",
              pointerEvents: "none",
            },
          }}
        >
          {/* Moving Track */}
          <Box
            sx={{
              display: "flex",
              width: "max-content",

              animation:
                "companySlider 25s linear infinite",

              "&:hover": {
                animationPlayState: "paused",
              },

              "@keyframes companySlider": {
                "0%": {
                  transform: "translateX(0)",
                },
                "100%": {
                  transform: "translateX(-50%)",
                },
              },
            }}
          >
            {sliderCompanies.map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.25,
                }}
                style={{
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 180,
                      sm: 210,
                      md: 230,
                    },

                    height: {
                      xs: 140,
                      sm: 150,
                      md: 165,
                    },

                    mx: {
                      xs: 1,
                      sm: 1.5,
                      md: 2,
                    },

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",

                    borderRadius: {
                      xs: 4,
                      md: 5,
                    },

                    background:
                      "rgba(255,255,255,0.75)",

                    backdropFilter: "blur(18px)",

                    border:
                      "1px solid rgba(255,255,255,0.9)",

                    boxShadow:
                      "0 12px 35px rgba(15,23,42,0.08)",

                    transition:
                      "all 0.3s ease",

                    cursor: "pointer",

                    "&:hover": {
                      boxShadow:
                        "0 20px 50px rgba(37,99,235,0.18)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={`${company.name} logo`}
                    sx={{
                      width: {
                        xs: 65,
                        sm: 75,
                        md: 85,
                      },

                      height: {
                        xs: 65,
                        sm: 75,
                        md: 85,
                      },

                      objectFit: "contain",

                      mb: 1.5,

                      filter:
                        "drop-shadow(0 5px 10px rgba(0,0,0,0.08))",
                    }}
                  />

                  <Typography
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: "0.95rem",
                        sm: "1rem",
                      },

                      color: "#0F172A",
                    }}
                  >
                    {company.name}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CompanySlider;