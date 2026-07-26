import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB",
        },
        secondary: {
            main: "#1E293B",
        },
        background: {
            default: "#F8FAFC",
        },
    },

    typography: {
        fontFamily: "'Poppins', sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 700,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },
});

export default theme;