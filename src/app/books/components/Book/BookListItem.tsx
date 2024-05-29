import { IBook } from 'src/core/model/book.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function BookListItem({ book }: { book: IBook }) {
    const renderBook = () => {
        return (
            <Card key={book.isbn13}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {book.authors}
                    </Typography>
                    <img src={book.icons.small} alt={book.title} />
                    <div>
                        <span>{book.ratings.average}</span>
                        <span>({book.ratings.count})</span>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (book ? renderBook() : <p>No book found</p>);
}

export default BookListItem;