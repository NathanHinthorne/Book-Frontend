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
import Footer from "src/app/books/components/Layout/Footer";
import Header from "src/app/books/components/Layout/Header";
import * as api from "@/app/books/api/route";
import { useEffect, useState } from "react";

const theme = createTheme();

export default function Home() {
    // fake books data
    const [books, setBooks] = useState<IBook[]>([{
        isbn13: 0,
        authors: "...loading authors",
        publication: 0,
        original_title: "...loading original title",
        title: "...loading title",
        ratings: {
            average: 0,
            count: 0,
            rating_1: 0,
            rating_2: 0,
            rating_3: 0,
            rating_4: 0,
            rating_5: 0,
        },
        icons: {
            large: "...loading large icon",
            small: "...loading small icon",
        },
    }]);

    // reflect all books from the database in the bookList
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await api.getAllBooks(1, 30); // 1 page, 30 books per page
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
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
                        <Typography variant="h4" component="h1" gutterBottom>
                            Explore
                        </Typography>
                        <BookList books={books} />
                    </Box>
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    );
}
