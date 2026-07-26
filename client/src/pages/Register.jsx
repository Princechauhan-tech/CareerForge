import { Box, Grid } from "@mui/material";

import HeroSection from "../components/auth/HeroSection";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #EEF4FF, #F8FAFC)",
      }}
    >
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          size={{ xs: 0, md: 6 }}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <HeroSection />
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: {
              xs: 2,
              sm: 4,
              md: 6,
            },
          }}
        >
          <RegisterForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;