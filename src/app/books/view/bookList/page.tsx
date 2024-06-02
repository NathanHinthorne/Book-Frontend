"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "@/app/books/view/theme";
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

export default function Home() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    // reflect all books from the database in the bookList
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await api.getAllBooks(5, 28); // 1 page, 28 books per page
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = () => {
        // Perform the search
        // ...

        setHasSearched(true);
    };

    return (
        <ThemeProvider theme={darkTheme}>
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
                    {!hasSearched && (
                        <Typography variant="h2" component="h1" gutterBottom color="primary">
                            <strong>Explore</strong>
                        </Typography>
                    )}

                    {isLoading ? <Typography>Loading books...</Typography> : <BookList books={books} />}
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
