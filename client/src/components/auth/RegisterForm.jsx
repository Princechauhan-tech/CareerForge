import {
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Link,
} from "@mui/material";

import {
  Person,
  Email,
  Business,
} from "@mui/icons-material";

import PasswordField from "./PasswordField";

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register Button Clicked");
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: 500,
        p: 5,
        borderRadius: 5,
        bgcolor: "rgba(255,255,255,.95)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 25px 60px rgba(0,0,0,.15)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
      >
        Create Account 🚀
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          color: "text.secondary",
        }}
      >
        Join CareerForge and start building your career.
      </Typography>

      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
        {/* Full Name */}

        <TextField
          fullWidth
          label="Full Name"
          placeholder="Enter your full name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        {/* Email */}

        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        {/* Role */}

        <TextField
          select
          fullWidth
          label="Register As"
          defaultValue=""
          SelectProps={{
            native: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business color="primary" />
              </InputAdornment>
            ),
          }}
        >
          <option value=""></option>
          <option value="Student">Student</option>
          <option value="Company">Company</option>
        </TextField>

        {/* Password */}

        <PasswordField
          label="Password"
          placeholder="Create a password"
        />

        {/* Confirm Password */}

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
        />

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

            "&:hover": {
              background:
                "linear-gradient(135deg,#1D4ED8,#1E40AF)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Create Account
        </Button>

        <Divider>OR</Divider>

        <Typography
          align="center"
          color="text.secondary"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            underline="hover"
            fontWeight={600}
          >
            Sign In
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default RegisterForm;