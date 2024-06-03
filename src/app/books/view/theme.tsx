"use client";

import { createTheme } from "@mui/material/styles";

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
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    color: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#666666",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff",
                    },
                },
                listbox: {
                    backgroundColor: "#333333",
                    color: "#ffffff",
                },
            },
        },
    },
});
export default darkTheme;