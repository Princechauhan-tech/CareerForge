import { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Stack,
  Typography,
  Alert,
  Chip,
  Divider,
} from "@mui/material";

import {
  CloudUploadRounded,
  DescriptionRounded,
  ArrowBackRounded,
  AutoAwesomeRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setAnalyzed(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      return;
    }

    setAnalyzing(true);

    // Temporary frontend analysis simulation
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1800);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="md">

        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Button
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/student-dashboard")}
          >
            Dashboard
          </Button>
        </Stack>

        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(15,23,42,.08)",
          }}
        >
          <Box
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              color: "#fff",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <DescriptionRounded sx={{ fontSize: 48 }} />

              <Box>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      md: "3rem",
                    },
                  }}
                >
                  Resume Analyzer
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    opacity: 0.9,
                  }}
                >
                  Analyze your resume and improve your ATS score.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >

            {/* Upload Area */}

            <Box
              onClick={handleUploadClick}
              sx={{
                border: "2px dashed #CBD5E1",
                borderRadius: 4,
                p: 5,
                textAlign: "center",
                cursor: "pointer",
                background: "#F8FAFC",
                transition: "0.2s",
                "&:hover": {
                  borderColor: "#2563EB",
                  background: "#EFF6FF",
                },
              }}
            >
              <CloudUploadRounded
                sx={{
                  fontSize: 55,
                  color: "#2563EB",
                  mb: 1,
                }}
              />

              <Typography
                fontWeight={800}
                fontSize="1.2rem"
              >
                {selectedFile
                  ? selectedFile.name
                  : "Upload your resume"}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Click here to select PDF or DOCX resume
              </Typography>
            </Box>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
            />

            {/* Selected File */}

            {selectedFile && (
              <Alert
                severity="success"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                }}
              >
                Resume selected successfully:{" "}
                <strong>{selectedFile.name}</strong>
              </Alert>
            )}

            {/* Analyze Button */}

            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<AutoAwesomeRounded />}
              disabled={!selectedFile || analyzing}
              onClick={handleAnalyze}
              sx={{
                mt: 3,
                py: 1.7,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: "1rem",
              }}
            >
              {analyzing
                ? "Analyzing Resume..."
                : "Analyze Resume"}
            </Button>

            {analyzing && (
              <LinearProgress
                sx={{
                  mt: 2,
                  borderRadius: 5,
                }}
              />
            )}

            {/* Result */}

            {analyzed && (
              <Box sx={{ mt: 4 }}>

                <Divider sx={{ mb: 4 }} />

                <Typography
                  fontWeight={900}
                  fontSize="1.5rem"
                  mb={3}
                >
                  Resume Analysis Result
                </Typography>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <Box
                    sx={{
                      flex: 1,
                      p: 3,
                      borderRadius: 4,
                      background: "#ECFDF5",
                    }}
                  >
                    <Typography
                      color="text.secondary"
                    >
                      ATS Score
                    </Typography>

                    <Typography
                      fontWeight={900}
                      fontSize="3rem"
                      color="#059669"
                    >
                      88%
                    </Typography>

                    <Chip
                      icon={<CheckCircleRounded />}
                      label="Good Resume"
                      color="success"
                    />
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      p: 3,
                      borderRadius: 4,
                      background: "#EFF6FF",
                    }}
                  >
                    <Typography
                      color="text.secondary"
                    >
                      Keyword Match
                    </Typography>

                    <Typography
                      fontWeight={900}
                      fontSize="3rem"
                      color="#2563EB"
                    >
                      82%
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      Good job relevance
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 4,
                    background: "#F8FAFC",
                  }}
                >
                  <Typography
                    fontWeight={800}
                    mb={2}
                  >
                    AI Recommendations
                  </Typography>

                  <Typography color="text.secondary">
                    • Add more measurable achievements.
                  </Typography>

                  <Typography color="text.secondary">
                    • Improve technical skill keywords.
                  </Typography>

                  <Typography color="text.secondary">
                    • Add relevant project descriptions.
                  </Typography>
                </Box>
              </Box>
            )}

            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackRounded />}
              onClick={() => navigate("/student-dashboard")}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ResumeAnalyzer;