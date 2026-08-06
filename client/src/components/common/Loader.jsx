import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />

      <Typography
        variant="h6"
        color="text.secondary"
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;