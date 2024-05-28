import { IBook } from 'src/core/model/book.model';


function BookListItem({ book }: { book: IBook }) {
    const renderBook = () => {
        return (
            <div key={book.isbn13}>
                <h2>{book.title}</h2>
                <h3>{book.authors}</h3>
                <p>{book.original_title}</p>
                <img src={book.icons.large} alt={book.title} />
                <div>
                    <span>{book.ratings.average}</span>
                    <span>({book.ratings.count})</span>
                </div>
            </div>
        );
    };

    return (book) ? renderBook() : <p>No book found</p>;
}

export default BookListItem;