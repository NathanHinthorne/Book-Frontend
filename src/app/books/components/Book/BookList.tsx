import { IBook } from 'src/core/model/book.model';
import BookListItem from './BookListItem';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import * as api from '@/app/books/api/route';

function BookList({ books }: { books: IBook[] }) {
    const [selectedBooks, setSelectedBooks] = useState<IBook[]>([]);

    const handleSelectBook = (book: IBook) => {
        setSelectedBooks(prevBooks => {
            if (prevBooks.find(b => b.isbn13 === book.isbn13)) {
                // If the book is already selected, unselect it
                return prevBooks.filter(b => b.isbn13 !== book.isbn13);
            } else {
                // If the book is not selected, add it to the selected books
                return [...prevBooks, book];
            }
        });
    };

    const deleteSelectedBooks = async () => {
        const isbns = selectedBooks.map(book => book.isbn13);
        const message = await api.deleteBooks(isbns);
        setSelectedBooks([]);
        console.log(message);
    };

    const renderBooks = () => {
        return (
            <Grid container spacing={3}>
                {books.map((book: IBook) => {
                    const isSelected = !!selectedBooks.find(b => b.isbn13 === book.isbn13);
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.isbn13}>
                            <BookListItem book={book} selected={isSelected} onSelect={handleSelectBook} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    return (books.length > 0) ? renderBooks() : <p>Book list empty</p>;
}

export default BookList;