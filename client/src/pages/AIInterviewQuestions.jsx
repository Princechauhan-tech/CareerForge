import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  EmojiEventsRounded,
  PsychologyRounded,
  ReplayRounded,
  TimerRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const questionBank = [
  {
    id: 1,
    category: "Frontend",
    difficulty: "Easy",
    question: "What is the difference between state and props in React?",
    answer:
      "Props are used to pass data from a parent component to a child component, while state is internal data managed by a component and can change over time.",
    keywords: ["props", "state", "parent", "component"],
  },

  {
    id: 2,
    category: "React",
    difficulty: "Medium",
    question: "What is the purpose of useEffect in React?",
    answer:
      "useEffect is used to perform side effects in functional components, such as API calls, subscriptions, timers, and updating external systems.",
    keywords: ["useEffect", "side effect", "API", "component"],
  },

  {
    id: 3,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is the difference between let, const and var?",
    answer:
      "let and const are block scoped, while var is function scoped. A let variable can be reassigned, const cannot be reassigned, and var has older hoisting behavior.",
    keywords: ["let", "const", "var", "scope"],
  },

  {
    id: 4,
    category: "JavaScript",
    difficulty: "Hard",
    question: "Explain event bubbling in JavaScript.",
    answer:
      "Event bubbling means an event triggered on a child element propagates upward through its parent elements unless propagation is stopped.",
    keywords: ["event", "bubbling", "parent", "child"],
  },

  {
    id: 5,
    category: "Frontend",
    difficulty: "Medium",
    question: "What is responsive web design?",
    answer:
      "Responsive web design is an approach where a website adapts its layout and content to different screen sizes and devices using flexible layouts, media queries and responsive components.",
    keywords: ["responsive", "screen", "media", "device"],
  },

  {
    id: 6,
    category: "Backend",
    difficulty: "Medium",
    question: "What is REST API?",
    answer:
      "A REST API is an architectural style for communication between applications using HTTP methods such as GET, POST, PUT and DELETE.",
    keywords: ["REST", "API", "HTTP", "GET", "POST"],
  },

  {
    id: 7,
    category: "MongoDB",
    difficulty: "Medium",
    question: "What is MongoDB and why is it commonly used with Node.js?",
    answer:
      "MongoDB is a NoSQL document database that stores data in flexible JSON-like documents. It works well with Node.js because JavaScript objects map naturally to MongoDB documents.",
    keywords: ["MongoDB", "NoSQL", "document", "Node"],
  },

  {
    id: 8,
    category: "HR",
    difficulty: "Easy",
    question: "Tell me about yourself.",
    answer:
      "A strong answer should briefly cover your education or experience, important technical skills, projects, achievements and why you are interested in the role.",
    keywords: ["experience", "skills", "projects", "role"],
  },
];

const getDifficultyColor = (difficulty) => {
  if (difficulty === "Easy") return "success";
  if (difficulty === "Medium") return "warning";
  return "error";
};

const AIInterviewQuestions = () => {
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questionBank[currentIndex];

  const progress = useMemo(() => {
    return ((currentIndex + 1) / questionBank.length) * 100;
  }, [currentIndex]);

  const evaluateAnswer = () => {
    if (!answer.trim()) return;

    const normalizedAnswer = answer.toLowerCase();

    const matchedKeywords = currentQuestion.keywords.filter((keyword) =>
      normalizedAnswer.includes(keyword.toLowerCase())
    );

    const keywordScore = Math.min(
      10,
      matchedKeywords.length * 2.5
    );

    setScore((prev) => prev + keywordScore);
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentIndex === questionBank.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setAnswer("");
    setSubmitted(false);
  };

  const restartPractice = () => {
    setStarted(true);
    setCurrentIndex(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  const getFinalScore = () => {
    const maxScore = questionBank.length * 10;

    return Math.min(
      100,
      Math.round((score / maxScore) * 100)
    );
  };

  /*
   * ============================================
   * INTRO SCREEN
   * ============================================
   */

  if (!started) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 4, md: 7 },
          background:
            "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 6,
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              color: "#fff",
              boxShadow:
                "0 25px 60px rgba(37,99,235,.20)",
            }}
          >
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,.16)",
                  }}
                >
                  <PsychologyRounded
                    sx={{ fontSize: 36 }}
                  />
                </Box>

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
                    AI Interview Practice
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      opacity: 0.9,
                    }}
                  >
                    Practice technical and HR interview
                    questions and improve your confidence.
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Chip
                  label={`${questionBank.length} Questions`}
                  sx={{
                    color: "#fff",
                    background: "rgba(255,255,255,.15)",
                    fontWeight: 700,
                  }}
                />

                <Chip
                  label="Frontend + Backend + HR"
                  sx={{
                    color: "#fff",
                    background: "rgba(255,255,255,.15)",
                    fontWeight: 700,
                  }}
                />

                <Chip
                  label="Instant Score"
                  sx={{
                    color: "#fff",
                    background: "rgba(255,255,255,.15)",
                    fontWeight: 700,
                  }}
                />
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(255,255,255,.12)",
                  color: "#fff",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography fontWeight={800}>
                    How it works
                  </Typography>

                  <Typography>
                    1. Read the interview question.
                  </Typography>

                  <Typography>
                    2. Write your answer.
                  </Typography>

                  <Typography>
                    3. Submit your answer.
                  </Typography>

                  <Typography>
                    4. Compare your answer with the
                    expected answer.
                  </Typography>

                  <Typography>
                    5. Get your final practice score.
                  </Typography>
                </Stack>
              </Paper>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setStarted(true)}
                  sx={{
                    py: 1.6,
                    px: 4,
                    borderRadius: 3,
                    background: "#fff",
                    color: "#2563EB",
                    fontWeight: 900,
                    "&:hover": {
                      background: "#F8FAFC",
                    },
                  }}
                >
                  START INTERVIEW PRACTICE
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/student-dashboard")
                  }
                  sx={{
                    py: 1.6,
                    px: 4,
                    borderRadius: 3,
                    borderColor: "rgba(255,255,255,.7)",
                    color: "#fff",
                    fontWeight: 800,
                  }}
                >
                  BACK TO DASHBOARD
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  /*
   * ============================================
   * FINAL RESULT
   * ============================================
   */

  if (finished) {
    const finalScore = getFinalScore();

    let message = "Keep practicing!";

    if (finalScore >= 80) {
      message = "Excellent interview preparation!";
    } else if (finalScore >= 60) {
      message = "Good job! A little more practice will help.";
    }

    return (
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 4, md: 7 },
          background:
            "linear-gradient(180deg,#F8FAFC,#EEF4FF)",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 6,
              textAlign: "center",
              boxShadow:
                "0 25px 60px rgba(15,23,42,.08)",
            }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 3,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg,#F59E0B,#EF4444)",
              }}
            >
              <EmojiEventsRounded
                sx={{
                  color: "#fff",
                  fontSize: 48,
                }}
              />
            </Box>

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
              Practice Complete 🎉
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {message}
            </Typography>

            <Box
              sx={{
                mt: 5,
                mb: 4,
                p: 4,
                borderRadius: 5,
                background: "#F8FAFC",
              }}
            >
              <Typography
                color="text.secondary"
                fontWeight={700}
              >
                YOUR INTERVIEW SCORE
              </Typography>

              <Typography
                fontSize="5rem"
                fontWeight={900}
                color="#2563EB"
                lineHeight={1.1}
              >
                {finalScore}%
              </Typography>

              <Typography color="text.secondary">
                Based on keyword coverage in your
                answers.
              </Typography>
            </Box>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                startIcon={<ReplayRounded />}
                onClick={restartPractice}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 800,
                }}
              >
                Practice Again
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/student-dashboard")
                }
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 800,
                }}
              >
                Dashboard
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  /*
   * ============================================
   * QUESTION SCREEN
   * ============================================
   */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 5 },
        background:
          "linear-gradient(180deg,#F8FAFC,#EEF4FF)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 3,
            borderRadius: 4,
            boxShadow:
              "0 15px 40px rgba(15,23,42,.06)",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "center",
              }}
              spacing={2}
            >
              <Box>
                <Typography
                  fontWeight={900}
                  fontSize="1.4rem"
                >
                  AI Interview Practice
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Question {currentIndex + 1} of{" "}
                  {questionBank.length}
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <TimerRounded color="primary" />

                <Typography
                  fontWeight={800}
                  color="primary"
                >
                  Practice Mode
                </Typography>
              </Stack>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 10,
              }}
            />
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            boxShadow:
              "0 20px 50px rgba(15,23,42,.07)",
          }}
        >
          {/* Question Meta */}

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mb: 3 }}
          >
            <Chip
              label={currentQuestion.category}
              color="primary"
              sx={{ fontWeight: 700 }}
            />

            <Chip
              label={currentQuestion.difficulty}
              color={getDifficultyColor(
                currentQuestion.difficulty
              )}
              sx={{ fontWeight: 700 }}
            />
          </Stack>

          {/* Question */}

          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              lineHeight: 1.35,
            }}
          >
            {currentQuestion.question}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Write your answer as if you are answering
            a real interviewer.
          </Typography>

          {/* Answer */}

          <TextField
            fullWidth
            multiline
            minRows={8}
            value={answer}
            onChange={(event) =>
              setAnswer(event.target.value)
            }
            disabled={submitted}
            placeholder="Type your answer here..."
            sx={{
              mt: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                background: "#F8FAFC",
              },
            }}
          />

          {!submitted ? (
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CheckCircleRounded />}
              disabled={!answer.trim()}
              onClick={evaluateAnswer}
              sx={{
                mt: 3,
                py: 1.7,
                borderRadius: 3,
                fontWeight: 900,
              }}
            >
              SUBMIT ANSWER
            </Button>
          ) : (
            <Stack spacing={3} sx={{ mt: 4 }}>
              <Alert
                severity="success"
                sx={{
                  borderRadius: 3,
                  alignItems: "center",
                }}
              >
                Answer submitted successfully.
              </Alert>

              {/* Expected Answer */}

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "#ECFDF5",
                  border:
                    "1px solid #A7F3D0",
                }}
              >
                <Typography
                  fontWeight={900}
                  color="#047857"
                  mb={1}
                >
                  Expected Answer
                </Typography>

                <Typography
                  color="text.secondary"
                  lineHeight={1.8}
                >
                  {currentQuestion.answer}
                </Typography>
              </Paper>

              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={
                  <ArrowForwardRounded />
                }
                onClick={nextQuestion}
                sx={{
                  py: 1.7,
                  borderRadius: 3,
                  fontWeight: 900,
                }}
              >
                {currentIndex ===
                questionBank.length - 1
                  ? "VIEW FINAL RESULT"
                  : "NEXT QUESTION"}
              </Button>
            </Stack>
          )}

          <Button
            fullWidth
            variant="text"
            startIcon={<ArrowBackRounded />}
            onClick={() =>
              navigate("/student-dashboard")
            }
            sx={{
              mt: 1,
              py: 1.3,
              borderRadius: 3,
              fontWeight: 700,
            }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AIInterviewQuestions;