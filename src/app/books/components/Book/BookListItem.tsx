import { IBook } from 'src/core/model/book.model';
import './BookListItem.css'; // import the CSS file

function BookListItem({ book }: { book: IBook }) {
    const renderBook = () => {
        return (
            <div key={book.isbn13}>
                <h2>{book.title}</h2>
                <h3>{book.authors}</h3>
                <img src={book.icons.small} alt={book.title} />
                <div>
                    <span>{book.ratings.average}</span>
                    <span>({book.ratings.count})</span>
                </div>
            </div>
        );
    };

    return (
        <div className="book-item">
            {book ? renderBook() : <p>No book found</p>}
        </div>
    );
}

export default BookListItem;