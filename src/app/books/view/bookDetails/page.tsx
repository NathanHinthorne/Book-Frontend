"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IBook } from "@/core/model/book.model";
import BookList from "src/app/books/components/Book/BookList";
import * as api from "@/app/books/api/route";
import Footer from "src/app/books/components/Layout/Footer";
import Header from "src/app/books/components/Layout/Header";
import { useEffect, useState } from "react";
import BookDetails from "../../components/Book/BookDetails";



const theme = createTheme();


export default function Home() {
    // fake book data
    const [book, setBook] = useState<IBook>({
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
    });


    // reflect book detail from the database in the bookDetail
    useEffect(() => {
        const fetchBook = async () => {
            try {
                let isbn : number = 9780061120080;
                const fetchedBook = await api.getBookByIsbn(isbn);
                setBook(fetchedBook);
            } catch (error) {
                console.error('Failed to fetch book:', error);
            }
        };

        fetchBook();
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Container>
                    <Box
                        sx={{
                            my: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Book Details
                        </Typography>
                        {/* add format for book */}
                        <BookDetails book={book} />
                    </Box>
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    );
}
