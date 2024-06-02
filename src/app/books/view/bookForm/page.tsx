"use client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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

import { IBook } from "@/core/model/book.model";
import * as api from "@/app/books/api/route";
import BookForm from "src/app/books/components/Book/BookForm";

const theme = createTheme();

export default function Page() {
    const onSubmit = (book: IBook) => {
        console.log(book);
        api.createBook(book)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                        Add Book
                    </Typography>
                    <BookForm onSubmit={onSubmit} />
                </Box>
                <Button variant = "contained" href="/books/view/bookList"> Back </Button>
            </Container>
        </ThemeProvider>
    );
}

