import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

import { motion } from "framer-motion";

const categories = [
  {
    icon: CodeRoundedIcon,
    title: "Development",
    jobs: "2,500+ Jobs",
    color: "#2563EB",
  },
  {
    icon: PaletteRoundedIcon,
    title: "UI / UX Design",
    jobs: "850+ Jobs",
    color: "#EC4899",
  },
  {
    icon: CampaignRoundedIcon,
    title: "Marketing",
    jobs: "1,200+ Jobs",
    color: "#F97316",
  },
  {
    icon: AccountBalanceRoundedIcon,
    title: "Finance",
    jobs: "950+ Jobs",
    color: "#10B981",
  },
  {
    icon: GroupsRoundedIcon,
    title: "Human Resources",
    jobs: "700+ Jobs",
    color: "#8B5CF6",
  },
  {
    icon: AnalyticsRoundedIcon,
    title: "Data Science",
    jobs: "1,400+ Jobs",
    color: "#06B6D4",
  },
];

const TopCategories = () => {
  return (
    <Box
      sx={{
        py: {
          xs: 8,
          md: 12,
        },
        background: "#fff",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.8,
                borderRadius: 10,
                background: "#EEF4FF",
                color: "#2563EB",
                fontWeight: 700,
                fontSize: "0.85rem",
                mb: 2,
              }}
            >
              TOP CATEGORIES
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.15,
                fontSize: {
                  xs: "2rem",
                  sm: "2.6rem",
                  md: "3.2rem",
                },
              }}
            >
              Explore Jobs By
              <br />

              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg,#2563EB,#7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Popular Categories
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 700,
                mx: "auto",
                color: "#64748B",
                lineHeight: 1.8,
              }}
            >
              Discover opportunities across the most
              in-demand industries and career paths.
            </Typography>
          </Box>
        </motion.div>

        {/* Categories */}

        <Grid container spacing={3}>
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.title}
              >
                <motion.div
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 6,
                      background:
                        "linear-gradient(145deg,#fff,#f8fafc)",
                      border:
                        "1px solid rgba(226,232,240,.8)",
                      boxShadow:
                        "0 15px 40px rgba(15,23,42,.05)",
                      transition: ".3s",

                      "&:hover": {
                        boxShadow:
                          "0 25px 60px rgba(37,99,235,.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${item.color}15`,
                        color: item.color,
                        mb: 3,
                      }}
                    >
                      <Icon sx={{ fontSize: 34 }} />
                    </Box>

                    <Typography
                      fontWeight={800}
                      fontSize="1.2rem"
                      mb={1}
                      color="#0F172A"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      color="#64748B"
                    >
                      {item.jobs}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopCategories;