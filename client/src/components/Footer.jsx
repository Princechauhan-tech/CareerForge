import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import {
  LinkedIn,
  Twitter,
  Instagram,
  GitHub,
} from "@mui/icons-material";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#0F172A 0%,#020617 100%)",
        color: "#fff",
        pt: { xs: 8, md: 10 },
        pb: 3,
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.15), transparent 70%)",
          top: -120,
          left: -120,
          filter: "blur(50px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)",
          bottom: -100,
          right: -100,
          filter: "blur(50px)",
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 8 }}>
          {/* Brand */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg,#2563EB,#7C3AED)",
                    boxShadow:
                      "0 10px 30px rgba(37,99,235,.35)",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                  }}
                >
                  C
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                >
                  CareerForge
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "rgba(255,255,255,.65)",
                  maxWidth: 450,
                  lineHeight: 1.9,
                }}
              >
                Empowering students and professionals
                to discover opportunities, build skills,
                and create successful careers through one
                powerful platform.
              </Typography>

              {/* Social */}
              <Stack direction="row" spacing={1}>
                {[
                  {
                    icon: <LinkedIn />,
                    label: "LinkedIn",
                  },
                  {
                    icon: <Twitter />,
                    label: "Twitter",
                  },
                  {
                    icon: <Instagram />,
                    label: "Instagram",
                  },
                  {
                    icon: <GitHub />,
                    label: "GitHub",
                  },
                ].map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{
                      y: -4,
                      scale: 1.08,
                    }}
                  >
                    <IconButton
                      sx={{
                        color:
                          "rgba(255,255,255,.75)",
                        background:
                          "rgba(255,255,255,.06)",
                        border:
                          "1px solid rgba(255,255,255,.08)",

                        "&:hover": {
                          color: "#fff",
                          background:
                            "rgba(37,99,235,.25)",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Platform */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              fontWeight={700}
              mb={2.5}
            >
              Platform
            </Typography>

            <Stack spacing={1.5}>
              {[
                "Find Jobs",
                "Companies",
                "Internships",
                "Career Resources",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color:
                      "rgba(255,255,255,.6)",
                    transition: ".3s",

                    "&:hover": {
                      color: "#60A5FA",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              fontWeight={700}
              mb={2.5}
            >
              Company
            </Typography>

            <Stack spacing={1.5}>
              {[
                "About Us",
                "Contact",
                "Careers",
                "Privacy Policy",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color:
                      "rgba(255,255,255,.6)",

                    "&:hover": {
                      color: "#60A5FA",
                      pl: 0.5,
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              fontWeight={700}
              mb={2.5}
            >
              Support
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,.6)",
                  lineHeight: 1.8,
                }}
              >
                Need help with your career
                journey? Our team is always
                ready to help.
              </Typography>

              <Link
                href="mailto:support@careerforge.com"
                underline="none"
                sx={{
                  color: "#60A5FA",
                  fontWeight: 600,

                  "&:hover": {
                    color: "#93C5FD",
                  },
                }}
              >
                support@careerforge.com
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 5,
            borderColor:
              "rgba(255,255,255,.08)",
          }}
        />

        {/* Bottom Footer */}
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "center",
            md: "center",
          }}
          spacing={2}
        >
          <Typography
            fontSize={14}
            color="rgba(255,255,255,.5)"
            textAlign="center"
          >
            © 2026 CareerForge. All Rights
            Reserved.
          </Typography>

          <Typography
            fontSize={14}
            sx={{
              background:
                "linear-gradient(90deg,#60A5FA,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Designed & Developed by PRINCE CHAUHAN ✨
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;