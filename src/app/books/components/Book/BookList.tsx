import { IBook } from 'src/core/model/book.model';
import BookListItem from './BookListItem';

function BookList({ books }: { books: IBook[] }) {
    const renderBooks = () => {
        return books.map((book: IBook) => {
            // Check `BookListItem` component for details on the html being rendered
            return <BookListItem key={book.isbn13} book={book} />;
        });
    };

    return (books.length > 0) ? renderBooks() : <p>Book list empty</p>;
}

export default BookList;