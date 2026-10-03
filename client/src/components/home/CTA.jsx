import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForwardRounded,
  RocketLaunchRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

const CTA = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background:
          "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #2563EB 100%)",
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
          background: "rgba(59,130,246,.25)",
          filter: "blur(80px)",
          top: -150,
          right: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(96,165,250,.18)",
          filter: "blur(70px)",
          bottom: -150,
          left: -100,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Stack
            alignItems="center"
            textAlign="center"
            spacing={3}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <RocketLaunchRounded
                sx={{
                  fontSize: 32,
                  color: "#fff",
                }}
              />
            </Box>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                color: "#fff",
                fontSize: {
                  xs: "2.2rem",
                  sm: "3rem",
                  md: "3.6rem",
                },
                lineHeight: 1.15,
              }}
            >
              Ready to Build Your Career?
            </Typography>

            <Typography
              sx={{
                maxWidth: 650,
                color: "rgba(255,255,255,.75)",
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.7,
              }}
            >
              Join CareerForge and discover opportunities,
              connect with top companies, and take the next
              step toward your dream career.
            </Typography>

            {/* Buttons */}
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{ pt: 2 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRounded />}
                  href="/register"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: 3,
                    background: "#fff",
                    color: "#1D4ED8",
                    fontWeight: 700,
                    fontSize: 16,
                    boxShadow:
                      "0 15px 35px rgba(0,0,0,.2)",
                    "&:hover": {
                      background: "#F8FAFC",
                    },
                  }}
                >
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  href="/login"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: 3,
                    borderColor:
                      "rgba(255,255,255,.45)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    "&:hover": {
                      borderColor: "#fff",
                      background:
                        "rgba(255,255,255,.08)",
                    },
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTA;