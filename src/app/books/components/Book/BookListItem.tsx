"use client";

import { IBook } from 'src/core/model/book.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import darkTheme from "@/app/books/view/theme";


const btnStyle = {
    textDecoration: 'none',
    display: 'inline-block',
    color: '#f9f9f9',
    background: 'linear-gradient(#1e1e1e, #1e1e1e) padding-box, linear-gradient(45deg, #ffe537 0%, #537fe7 100%) border-box',
    border: 'solid 2px transparent',
    borderRadius: 8,
    padding: '12px 24px',
    transition: '0.2s ease-in-out',
    textAlign: 'center',
    marginTop: 8,
}

function BookListItem({ book, selected, onSelect }: { book: IBook, selected: boolean, onSelect: (book: IBook) => void }) {
    const handleLearnMore = (e: React.MouseEvent) => {
        e.preventDefault();
        //TODO Open the book details page with the book isbn
    }

    const renderBook = () => {
        return (
            <Card
                key={book.isbn13}
                style={{
                    // width: '100%',
                    // height: '100%',
                    marginTop: 20,
                    maxWidth: '90vw',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 8,
                    overflow: 'hidden',
                    backgroundColor: selected ? darkTheme.palette.secondary.light : darkTheme.palette.secondary.main,
                    transition: 'background-color 0.3s ease'
                }}

                onClick={() => onSelect(book)}
            >
                <img src={book.icons.large} alt={book.title} />
                <CardContent style={{ padding: 20 }}>
                    <Typography variant="h5" component="h2" color="textPrimary">
                        {book.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {book.authors}
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                        isbn: {book.isbn13}
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginLeft: '10px' }}>
                            <span>rating: {book.ratings.average}</span> <br />
                            <span>total ratings: {book.ratings.count}</span>
                        </div>
                    </div>
                    <a href="#" style={btnStyle} target="_blank" onClick={handleLearnMore}>
                        Learn more
                    </a>
                </CardContent>
            </Card >
        );
    };

    return (book ? renderBook() : <p>No book found</p>);
}

export default BookListItem;