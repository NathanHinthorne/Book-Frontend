"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IBook } from "@/core/model/book.model";
import * as api from "@/app/books/api/route";
import { useEffect, useState } from "react";
import BookDetails from "../../components/Book/BookDetails";
import darkTheme from "@/app/books/view/theme";
import React from "react";
import { useRouter } from 'next/navigation';



const theme = createTheme();

export default function Home() {
    //const router = useRouter();
    //const [data, setData] = useState({});
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

    // useEffect(() => {
    //     if (router.query.data) {
    //       const jsonString = decodeURIComponent(router.query.data as string);
    //       const parsedData = JSON.parse(jsonString);
    //       setData(parsedData);
    //     }
    //   }, [router.query.data]);


//    reflect book detail from the database in the bookDetail
    useEffect(() => {
        const fetchBook = async () => {
            try {
                let isbn : number = 9780061120080;
                const fetchedBook = await api.getBookByIsbnForBD(isbn);
                setBook(fetchedBook);
            } catch (error) {
                console.error('Failed to fetch book:', error);
            }
        };

        fetchBook();
    }, []);



    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
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
            </ThemeProvider>
        </>
    );
}
