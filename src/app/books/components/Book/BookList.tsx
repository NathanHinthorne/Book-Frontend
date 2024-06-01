import { IBook } from 'src/core/model/book.model';
import BookListItem from './BookListItem';
import Grid from '@mui/material/Grid';

function BookList({ books }: { books: IBook[] }) {
    const renderBooks = () => {
        return (
            <Grid container spacing={3}>
                {books.map((book: IBook) => {
                    // Check `BookListItem` component for details on the html being rendered
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.isbn13}>
                            <BookListItem book={book} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    };

    return (books.length > 0) ? renderBooks() : <p>Book list empty</p>;
}

export default BookList;