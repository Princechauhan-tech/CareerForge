import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  CheckCircleRounded,
  LightbulbRounded,
  PsychologyRounded,
  RefreshRounded,
  TrendingUpRounded,
  WorkRounded,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialSuggestions = [
  {
    id: 1,
    title: "Improve your technical skills",
    description:
      "Add more job-relevant technical skills to improve your profile visibility.",
    skills: ["React", "Node.js", "MongoDB"],
    priority: "High",
  },
  {
    id: 2,
    title: "Strengthen your resume summary",
    description:
      "Your summary should clearly mention your experience, strongest skills and target role.",
    skills: ["Professional Summary"],
    priority: "High",
  },
  {
    id: 3,
    title: "Add measurable achievements",
    description:
      "Use numbers and measurable outcomes instead of only describing your responsibilities.",
    skills: ["Achievements", "Metrics"],
    priority: "Medium",
  },
  {
    id: 4,
    title: "Complete your profile",
    description:
      "Adding education, projects and certifications can increase recruiter visibility.",
    skills: ["Education", "Projects", "Certifications"],
    priority: "Medium",
  },
];

const AISuggestions = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const generateSuggestions = () => {
    setLoading(true);

    setTimeout(() => {
      setSuggestions([
        ...initialSuggestions,
        {
          id: 5,
          title: "Add stronger projects",
          description:
            "Add 2–3 strong projects with GitHub links, technologies used and your contribution.",
          skills: ["Projects", "GitHub"],
          priority: "High",
        },
        {
          id: 6,
          title: "Prepare for frontend interviews",
          description:
            "Practice JavaScript, React, HTML, CSS and frontend system-design questions.",
          skills: ["JavaScript", "React", "Frontend"],
          priority: "Medium",
        },
      ]);

      setGenerated(true);
      setLoading(false);
    }, 1200);
  };

  const priorityColor = (priority) => {
    if (priority === "High") return "error";
    if (priority === "Medium") return "warning";
    return "success";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 50%,#F8FAFC 100%)",
      }}
    >
      <Container maxWidth="xl">

        {/* HEADER */}

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
          mb={4}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              mb={1}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg,#7C3AED,#2563EB)",
                  color: "#fff",
                }}
              >
                <AutoAwesomeRounded />
              </Box>

              <Typography
                fontWeight={900}
                fontSize={{ xs: "2rem", md: "2.8rem" }}
              >
                AI Suggestions
              </Typography>
            </Stack>

            <Typography color="text.secondary" fontSize="1.05rem">
              Get personalized recommendations to improve your profile,
              resume and career opportunities.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/student-dashboard")}
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              px: 3,
            }}
          >
            Back to Dashboard
          </Button>
        </Stack>

        {/* AI SUMMARY */}

        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 5,
            color: "#fff",
            overflow: "hidden",
            background:
              "linear-gradient(135deg,#2563EB,#7C3AED)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4} alignItems="center">

              <Grid item xs={12} md={8}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PsychologyRounded
                    sx={{ fontSize: 48 }}
                  />

                  <Box>
                    <Typography
                      fontWeight={900}
                      fontSize="1.7rem"
                    >
                      Your AI Career Coach
                    </Typography>

                    <Typography sx={{ opacity: 0.9 }}>
                      Analyze your profile and discover the
                      improvements that can increase your chances
                      of getting shortlisted.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress
                        size={20}
                        sx={{ color: "#2563EB" }}
                      />
                    ) : (
                      <AutoAwesomeRounded />
                    )
                  }
                  disabled={loading}
                  onClick={generateSuggestions}
                  sx={{
                    py: 1.7,
                    borderRadius: 3,
                    background: "#fff",
                    color: "#2563EB",
                    fontWeight: 800,
                    "&:hover": {
                      background: "#F8FAFC",
                    },
                  }}
                >
                  {loading
                    ? "Analyzing Profile..."
                    : generated
                    ? "Regenerate Suggestions"
                    : "Generate AI Suggestions"}
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>

        {/* SUCCESS MESSAGE */}

        {generated && (
          <Alert
            icon={<CheckCircleRounded />}
            severity="success"
            sx={{
              mb: 4,
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            AI analysis completed. We found personalized improvements
            for your career profile.
          </Alert>
        )}

        {/* PROFILE SCORE */}

        <Grid container spacing={3} mb={4}>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography color="text.secondary">
                      Profile Strength
                    </Typography>

                    <Typography
                      fontWeight={900}
                      fontSize="2.5rem"
                    >
                      85%
                    </Typography>
                  </Box>

                  <TrendingUpRounded
                    sx={{
                      fontSize: 42,
                      color: "#2563EB",
                    }}
                  />
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    mt: 2,
                    height: 9,
                    borderRadius: 5,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography color="text.secondary">
                  Target Role
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mt={1}
                >
                  <WorkRounded color="primary" />

                  <Typography
                    fontWeight={900}
                    fontSize="1.4rem"
                  >
                    Frontend Developer
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography color="text.secondary">
                  Suggestions Found
                </Typography>

                <Typography
                  fontWeight={900}
                  fontSize="2.5rem"
                  color="#7C3AED"
                >
                  {suggestions.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* SUGGESTIONS */}

        <Box mb={3}>
          <Typography
            fontWeight={900}
            fontSize="1.8rem"
          >
            Personalized Recommendations
          </Typography>

          <Typography color="text.secondary">
            Follow these recommendations to strengthen your profile.
          </Typography>
        </Box>

        <Grid container spacing={3}>

          {suggestions.map((suggestion) => (
            <Grid
              item
              xs={12}
              md={6}
              key={suggestion.id}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  border: "1px solid #E2E8F0",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 18px 40px rgba(15,23,42,.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#EEF4FF",
                          color: "#2563EB",
                        }}
                      >
                        <LightbulbRounded />
                      </Box>

                      <Box>
                        <Typography
                          fontWeight={900}
                          fontSize="1.15rem"
                        >
                          {suggestion.title}
                        </Typography>

                        <Chip
                          label={suggestion.priority}
                          size="small"
                          color={priorityColor(
                            suggestion.priority
                          )}
                          sx={{
                            mt: 1,
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    </Stack>
                  </Stack>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    {suggestion.description}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    fontWeight={800}
                    fontSize="0.9rem"
                    mb={1.5}
                  >
                    Recommended Areas
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                  >
                    {suggestion.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

        {/* BOTTOM ACTIONS */}

        <Card
          elevation={0}
          sx={{
            mt: 5,
            borderRadius: 5,
            background: "#0F172A",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={3}
            >
              <Box>
                <Typography
                  fontWeight={900}
                  fontSize="1.4rem"
                >
                  Ready to improve your profile?
                </Typography>

                <Typography
                  sx={{
                    color: "#CBD5E1",
                    mt: 0.5,
                  }}
                >
                  Update your profile and resume using these
                  recommendations.
                </Typography>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                width={{ xs: "100%", md: "auto" }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/profile")}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    px: 3,
                  }}
                >
                  Update Profile
                </Button>

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/resume-analyzer")
                  }
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    px: 3,
                    color: "#fff",
                    borderColor: "#64748B",
                  }}
                >
                  Analyze Resume
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default AISuggestions;