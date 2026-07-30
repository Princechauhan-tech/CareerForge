import { useState } from "react";

import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const PasswordField = ({
  label = "Password",
  placeholder = "Enter your password",

  // React Hook Form
  register,
  name,

  // Controlled component (future use)
  value,
  onChange,

  error = false,
  helperText = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      {...(register && name ? register(name) : {})}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          transition: "0.3s",

          "&:hover fieldset": {
            borderColor: "#2563EB",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock color="primary" />
          </InputAdornment>
        ),

        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
            >
              {showPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;