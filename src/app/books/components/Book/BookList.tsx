import { IBook } from 'src/core/model/book.model';
import BookListItem from './BookListItem';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import * as api from '@/app/books/api/route';

function BookList({ books, selectedBooks, setSelectedBooks }:
    { books: IBook[], selectedBooks: IBook[], setSelectedBooks: React.Dispatch<React.SetStateAction<IBook[]>> }) {

    const handleSelectBook = (book: IBook) => {
        setSelectedBooks((prevBooks: IBook[]) => {
            if (prevBooks.find((b: { isbn13: number; }) => b.isbn13 === book.isbn13)) {
                // If the book is already selected, unselect it
                return prevBooks.filter((b: { isbn13: number; }) => b.isbn13 !== book.isbn13);
            } else {
                // If the book is not selected, add it to the selected books
                return [...prevBooks, book];
            }
        });
    };

    const renderBooks = () => {
        return (
            <Grid container spacing={3}>
                {books.map((book: IBook) => {
                    const isSelected: boolean = selectedBooks.some((b: { isbn13: number; }) => b.isbn13 === book.isbn13);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.isbn13}>
                            <BookListItem book={book} selected={isSelected} onSelect={handleSelectBook} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    return (books.length > 0) ? renderBooks() : <h2>Book list empty</h2>;
}

export default BookList;