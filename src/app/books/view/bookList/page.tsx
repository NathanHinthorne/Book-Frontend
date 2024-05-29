"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import Button from "@mui/material/Button";

import NextLink from "next/link";
import ProTip from "@/components/ProTips";
import Informational from "@/components/Informational";
import BookList from "src/app/books/components/Book/BookList";
import { IBook } from "@/core/model/book.model";
// import Footer from "src/app/books/components/Layout/Footer";
// import Header from "src/app/books/components/Layout/Header";
import * as api from "@/app/books/api/route";
import { useEffect, useState } from "react";

const theme = createTheme();

export default function Page() {
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await api.getAllBooks(1, 30);
            setBooks(fetchedBooks);
        };

        fetchBooks();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        my: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton aria-label="Delete" color="primary">
                        <DeleteIcon />
                    </IconButton>
                    <BookList books={books} />
                </Box>
            </Container>
            {/* <Footer /> */}
        </ThemeProvider>
    );
}
