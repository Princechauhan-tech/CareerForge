import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Link,
  MenuItem,
  Alert,
} from "@mui/material";

import {
  Person,
  Email,
  Business,
} from "@mui/icons-material";

import PasswordField from "./PasswordField";

import { registerUser } from "../../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
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
      <Typography variant="h4" fontWeight={700}>
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        >
          <MenuItem value="">Select Role</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Company">Company</MenuItem>
        </TextField>

        {/* Password */}

        <PasswordField
          label="Password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Register Button */}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
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
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <Divider>OR</Divider>

        <Typography
          align="center"
          color="text.secondary"
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
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