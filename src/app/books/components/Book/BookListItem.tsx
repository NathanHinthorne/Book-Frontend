import { IBook } from 'src/core/model/book.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function BookListItem({ book, selected, onSelect }: { book: IBook, selected: boolean, onSelect: (book: IBook) => void }) {
    const renderBook = () => {
        return (
            <Card
                key={book.isbn13}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: selected ? 'darkgrey' : 'white',
                    transition: 'background-color 0.3s ease'
                }}
                onClick={() => onSelect(book)}
            >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {book.authors}
                    </Typography>
                    <Typography variant="body2" component="p">
                        isbn: {book.isbn13}
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={book.icons.small} alt={book.title} />
                        <div style={{ marginLeft: '10px' }}>
                            <span>rating: {book.ratings.average}</span> <br />
                            <span>total ratings: {book.ratings.count}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (book ? renderBook() : <p>No book found</p>);
}

export default BookListItem;