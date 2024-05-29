// Display detailed information about a single book.

import { IBook } from 'src/core/model/book.model';
import RatingStars from './RatingStars';

function BookDetails({ book }: { book: IBook }) {
    const renderBook = () => {
        return (
            <div key={book.isbn13}>
                <h2>{book.title}</h2>
                <h3>{book.authors}</h3>
                <p>Publication Year: {book.publication}</p>
                <p>Original Title: {book.original_title}</p>
                <img src={book.icons.large} alt={"no image"} />
                <RatingStars ratings={book.ratings} />
            </div>
        );
    };

    return (book) ? renderBook() : <p>No book found</p>;
}

export default BookDetails;