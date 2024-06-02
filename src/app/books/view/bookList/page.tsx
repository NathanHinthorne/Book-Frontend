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
    Autocomplete,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    TextField,
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
import { render } from "react-dom";


export default function Home() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState<IBook[]>([]);

    // for search functionality
    const searchByArray = ['Title', 'Author', 'ISBN', 'Publication Year', 'Rating'];
    const [searchType, setSearchType] = useState<string | null>(searchByArray[0]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // reflect all books from the database in the bookList
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await api.getAllBooks(5, 28);
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const searchBooks = async () => {
        if (searchType === null) {
            alert('Please select a search type');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        let fetchedBooks;
        switch (searchType) {
            case 'Title':
                fetchedBooks = await api.getBookByTitle(searchTerm);
                break;
            case 'Author':
                fetchedBooks = await api.getBookByAuthor(searchTerm);
                break;
            case 'ISBN':
                fetchedBooks = await api.getBookByIsbn(parseInt(searchTerm));
                break;
            case 'Rating':
                fetchedBooks = await api.getBookByRating(parseInt(searchTerm));
                break;
            case 'Publication Year':
                fetchedBooks = await api.getBookByPublicationYear(parseInt(searchTerm));
                break;
            default:
                alert('Invalid search type');
                setIsLoading(false);
                return;
        }
        setBooks(fetchedBooks);
        setIsLoading(false);

        if (hasSearched === false) {
            // first time the user has searched
            setHasSearched(true);
        }
    };


    const renderSearch = () => {

        return (
            <Box
                display="flex"
                justifyContent="flex-end"
                mb={2}
                mt={2}
            >
                <Box
                    sx={{
                        py: 2, // Add padding to the top and bottom
                        px: 4, // Add padding to the left and right
                        backgroundColor: '#333333',
                        borderRadius: '10px', // Set rounded edges
                    }}
                    // left to right
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* Drop down menu */}
                    <Autocomplete
                        value={searchType}
                        onChange={(event: any, newValue: string | null) => {
                            setSearchType(newValue);
                        }}
                        inputValue={searchTerm}
                        onInputChange={(event, newInputValue) => {
                            setSearchTerm(newInputValue);
                        }}
                        options={searchByArray}
                        sx={{
                            width: 300,
                            mr: 1, // Add some margin to the right of the Autocomplete
                        }}
                        renderInput={(params) => <TextField {...params} label="Search by" />}
                    />
                    {/* Search input */}
                    <TextField
                        label={`${searchTerm}`}
                        variant="standard"
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                searchBooks();
                            }
                        }}
                    />
                </Box>
            </Box>
        );
    }

    const deleteSelectedBooks = async () => {
        const isbns = selectedBooks.map(book => book.isbn13);
        const message = await api.deleteBooks(isbns);
        console.log(message);
        setSelectedBooks([]);

        // Refresh the book list
        // TODO run the PREVIOUS api call used to refresh the book list
        // try {
        //     const fetchedBooks = await api.getAllBooks(1, 28); // 1 page, 28 books per page
        //     setBooks(fetchedBooks);
        // } catch (error) {
        //     console.error('Failed to fetch books:', error);
        // };
    };

    const stillLoading = () => {
        return (
            <Typography variant="h4" component="h2" gutterBottom>
                Loading books...
            </Typography>
        );
    }

    const renderBooks = () => {
        return (
            <BookList books={books} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
        );
    }

    const renderDeleteButton = () => {
        return (
            <Box
                sx={{
                    // left hand side of the screen
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={deleteSelectedBooks}
                    startIcon={<DeleteIcon />}
                    disabled={selectedBooks.length === 0}
                    sx={{ width: "140px" }}
                >
                    Delete books
                </Button>
            </Box>
        );
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                {renderSearch()}
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

                    {isLoading ? stillLoading() : renderBooks()}
                    {renderDeleteButton()}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
