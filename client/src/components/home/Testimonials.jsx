import {
  Avatar,
  Box,
  Container,
  Rating,
  Typography,
} from "@mui/material";

import {
  FormatQuoteRounded,
  VerifiedRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    text: "CareerForge helped me discover the right opportunities and prepare with confidence. The experience was smooth from start to finish.",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Product Designer",
    company: "Microsoft",
    text: "The platform made my job search much easier. I found relevant roles and finally landed an opportunity I was looking for.",
    initials: "RV",
  },
  {
    name: "Ananya Singh",
    role: "Software Developer",
    company: "Amazon",
    text: "A clean and professional platform for students and professionals. CareerForge genuinely made my career journey easier.",
    initials: "AS",
  },
];

const Testimonials = () => {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 8,
          md: 12,
        },
        background:
          "linear-gradient(180deg,#F8FAFC 0%,#EEF4FF 100%)",
      }}
    >
      <Container maxWidth="lg">

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
                backgroundColor: "#E0EAFF",
                color: "#2563EB",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              SUCCESS STORIES
            </Typography>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                color: "#0F172A",
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3.2rem",
                },
                letterSpacing: "-1px",
              }}
            >
              What Our Users Say
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 650,
                mx: "auto",
                mt: 2,
                lineHeight: 1.7,
              }}
            >
              Thousands of students and professionals are
              building their careers with CareerForge.
            </Typography>
          </Box>
        </motion.div>

        {/* Testimonials */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: {
              xs: 3,
              md: 4,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  position: "relative",

                  p: {
                    xs: 3,
                    sm: 4,
                  },

                  borderRadius: 5,

                  background:
                    "rgba(255,255,255,0.78)",

                  backdropFilter: "blur(18px)",

                  border:
                    "1px solid rgba(255,255,255,0.8)",

                  boxShadow:
                    "0 15px 40px rgba(15,23,42,0.08)",

                  transition:
                    "all 0.3s ease",

                  overflow: "hidden",

                  "&:hover": {
                    boxShadow:
                      "0 22px 50px rgba(37,99,235,0.14)",
                  },
                }}
              >

                {/* Quote Icon */}

                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 24,

                    width: 45,
                    height: 45,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: "50%",

                    backgroundColor: "#EEF4FF",

                    color: "#2563EB",
                  }}
                >
                  <FormatQuoteRounded />
                </Box>

                {/* Rating */}

                <Rating
                  value={5}
                  readOnly
                  size="small"
                  sx={{
                    mb: 3,
                  }}
                />

                {/* Text */}

                <Typography
                  sx={{
                    color: "#475569",
                    lineHeight: 1.8,
                    fontSize: "0.98rem",
                    minHeight: {
                      xs: "auto",
                      md: 120,
                    },
                  }}
                >
                  "{testimonial.text}"
                </Typography>

                {/* Divider */}

                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "#E2E8F0",
                    my: 3,
                  }}
                />

                {/* User */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,

                      fontWeight: 700,

                      background:
                        "linear-gradient(135deg,#2563EB,#7C3AED)",
                    }}
                  >
                    {testimonial.initials}
                  </Avatar>

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        fontWeight={800}
                        color="#0F172A"
                      >
                        {testimonial.name}
                      </Typography>

                      <VerifiedRounded
                        sx={{
                          fontSize: 17,
                          color: "#2563EB",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {testimonial.role}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#2563EB",
                        fontWeight: 700,
                      }}
                    >
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Box>

              </Box>
            </motion.div>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default Testimonials;