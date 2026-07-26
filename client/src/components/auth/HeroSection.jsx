import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
} from "@mui/material";

import {
  AutoAwesome,
  Work,
  Psychology,
  School,
} from "@mui/icons-material";

const features = [
  {
    icon: <Psychology />,
    title: "AI Resume Analysis",
  },
  {
    icon: <AutoAwesome />,
    title: "ATS Score Checker",
  },
  {
    icon: <Work />,
    title: "Smart Job Matching",
  },
  {
    icon: <School />,
    title: "Interview Preparation",
  },
];

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        px: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Blur Circle */}
      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          position: "absolute",
          top: -80,
          right: -80,
          filter: "blur(20px)",
        }}
      />

      <Chip
        label="🚀 AI Powered Recruitment Platform"
        sx={{
          width: "fit-content",
          bgcolor: "rgba(255,255,255,.15)",
          color: "#fff",
          fontWeight: 600,
          mb: 3,
        }}
      />

      <Typography
        variant="h2"
        fontWeight={800}
        sx={{
          lineHeight: 1.2,
        }}
      >
        CareerForge
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mt: 2,
          opacity: .9,
          maxWidth: 500,
        }}
      >
        Build your career with AI powered Resume Analysis,
        ATS Checker, Smart Job Matching and Interview Preparation.
      </Typography>

      {/* Stats */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 5,
          flexWrap: "wrap",
        }}
      >
        <Paper
          sx={{
            p: 2,
            bgcolor: "rgba(255,255,255,.12)",
            color: "#fff",
            backdropFilter: "blur(15px)",
            borderRadius: 3,
            minWidth: 120,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            10K+
          </Typography>

          <Typography variant="body2">
            Students
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            bgcolor: "rgba(255,255,255,.12)",
            color: "#fff",
            backdropFilter: "blur(15px)",
            borderRadius: 3,
            minWidth: 120,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            500+
          </Typography>

          <Typography variant="body2">
            Companies
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 2,
            bgcolor: "rgba(255,255,255,.12)",
            color: "#fff",
            backdropFilter: "blur(15px)",
            borderRadius: 3,
            minWidth: 120,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            95%
          </Typography>

          <Typography variant="body2">
            ATS Accuracy
          </Typography>
        </Paper>
      </Stack>

      {/* Features */}
      <Stack
        spacing={2}
        sx={{
          mt: 6,
          maxWidth: 500,
        }}
      >
        {features.map((feature) => (
          <Paper
            key={feature.title}
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "rgba(255,255,255,.12)",
              backdropFilter: "blur(18px)",
              borderRadius: 3,
              color: "#fff",
              border: "1px solid rgba(255,255,255,.15)",
              transition: ".3s",

              "&:hover": {
                transform: "translateX(8px)",
                bgcolor: "rgba(255,255,255,.18)",
              },
            }}
          >
            {feature.icon}

            <Typography fontWeight={600}>
              {feature.title}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default HeroSection;