import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  Alert,
} from "@mui/material";

import { Email } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "./PasswordField";
import { loginSchema } from "../../validation/loginSchema";
import { loginUser } from "../../services/authService";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      dispatch(loginStart());

      const response = await loginUser(data);

      dispatch(
        loginSuccess({
          token: response.token,
          user: response.user,
        })
      );

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      navigate("/");
    } catch (err) {
      dispatch(loginFailure());

      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
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

    {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )}

    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}

      <TextField
        label="Email Address"
        placeholder="Enter your email"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
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

      {/* Password */}

      <PasswordField
        label="Password"
        placeholder="Enter your password"
        register={register}
        name="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* Remember Me */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />
          }
          label="Remember Me"
        />

        <Link href="#" underline="hover">
          Forgot Password?
        </Link>
      </Stack>

      {/* Login Button */}

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
            transform: "translateY(-2px)",
            background:
              "linear-gradient(135deg,#1D4ED8,#1E40AF)",
          },
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
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