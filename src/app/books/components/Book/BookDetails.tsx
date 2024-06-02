// Display detailed information about a single book.

import { IBook } from 'src/core/model/book.model';
import RatingStars from './RatingStars';
import { Box, Container, Divider, Grid, Rating, rgbToHex } from '@mui/material';


function BookDetails({ book }: { book: IBook }) {
    const renderBook = () => {
        return (
            <Box>
                <Box
                height={350}
                width={600}
                alignItems="center"
                display="flex"
                gap={5}
                p={3}
                sx={{ border: '2px solid grey', bgcolor: '#83818c'}}>
                    <img src={book.icons.large} height={300} width={185} alt={"no image"} />
                    <div>
                    <h2>Title: {book.title}</h2>
                    <h3>Author: {book.authors}</h3>
                    <Rating name="read-only" value={book.ratings.average} defaultValue={2.5} precision={0.5} readOnly />
                    <p>ISBN: {book.isbn13}</p>
                    <p>Publication Year: {book.publication}</p>
                    <p>Ratings Count : {book.ratings.count} </p>
                    <p>Wanna add your own rating? Click below</p>
                    </div>
                </Box>
                <Box
                height={260}
                width={600}
                alignItems="center"
                paddingLeft={13}
                sx={{ border: '2px solid grey', bgcolor: '#a9b8cf'}}>
                    <div>
                    <p> 1 Star Rating <Rating name="read-only" value={1} readOnly/> {book.ratings.rating_1}</p>
                    <p> 2 Star Rating <Rating name="read-only" value={2} readOnly/> {book.ratings.rating_2}</p>
                    <p> 3 Star Rating <Rating name="read-only" value={3} readOnly/> {book.ratings.rating_3}</p>
                    <p> 4 Star Rating <Rating name="read-only" value={4} readOnly/> {book.ratings.rating_4}</p>
                    <p> 5 Star Rating <Rating name="read-only" value={5} readOnly/> {book.ratings.rating_5}</p>
                    </div>
                </Box>
            </Box>
        );
    };

    return (book) ? renderBook() : <p>No book found</p>;
}

export default BookDetails;