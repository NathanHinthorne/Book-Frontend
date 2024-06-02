"use client";

import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#333333",
            light: "#666666",
        },
        background: {
            default: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
        },
    },
});
export default darkTheme;