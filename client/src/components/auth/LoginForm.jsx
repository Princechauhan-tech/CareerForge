import {
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Link,
} from "@mui/material";

import { Email } from "@mui/icons-material";

import PasswordField from "./PasswordField";

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Button Clicked");
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: 480,
        p: 5,
        borderRadius: 5,
        bgcolor: "rgba(255,255,255,.95)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 25px 60px rgba(0,0,0,.15)",
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Welcome Back 👋
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          color: "text.secondary",
        }}
      >
        Sign in to continue your journey.
      </Typography>

      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email Address"
          placeholder="Enter your email"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Remember Me"
          />

          <Link
            href="#"
            underline="hover"
          >
            Forgot Password?
          </Link>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.6,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 16,
            background:
              "linear-gradient(135deg,#2563EB,#1D4ED8)",

            boxShadow:
              "0 12px 25px rgba(37,99,235,.35)",

            transition: ".3s",

            "&:hover": {
              transform: "translateY(-2px)",
              background:
                "linear-gradient(135deg,#1D4ED8,#1E40AF)",
            },
          }}
        >
          Sign In
        </Button>

        <Divider>OR</Divider>

        <Typography
          align="center"
          color="text.secondary"
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            underline="hover"
            fontWeight={600}
          >
            Register
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default LoginForm;