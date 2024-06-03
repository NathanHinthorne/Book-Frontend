// Display detailed information about a single book.

import { IBook, IRatings } from 'src/core/model/book.model';
import { Box, Button, Rating} from '@mui/material';
import darkTheme from "@/app/books/view/theme";
import * as api from "@/app/books/api/route";



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
                sx={{ border: '2px solid grey', bgcolor: darkTheme.palette.secondary.main}}>
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
                height={270}
                width={600}
                alignItems="center" 
                paddingLeft={13}
                sx={{ border: '2px solid grey', bgcolor: darkTheme.palette.secondary.light}}>
                    <div>
                    {/* I know I could have made a helper method but im burnt out and ready to be done */}
                    <p> 1 Star Rating <Rating name="read-only" value={1} readOnly/> {book.ratings.rating_1}
                    <Button onClick={() => 
                        {book.ratings.rating_1 = book.ratings.rating_1 + 1;
                        book.ratings.count = book.ratings.count + 1;
                        api.updateRatingsByIsbn(book.isbn13, book.ratings);
                        location.reload();}}>+</Button></p>
                    <p> 2 Star Rating <Rating name="read-only" value={2} readOnly/> {book.ratings.rating_2}
                    <Button onClick={() => 
                        {book.ratings.rating_2 = book.ratings.rating_2 + 1;
                        book.ratings.count = book.ratings.count + 1;
                        api.updateRatingsByIsbn(book.isbn13, book.ratings);
                        location.reload();}}>+</Button></p>
                    <p> 3 Star Rating <Rating name="read-only" value={3} readOnly/> {book.ratings.rating_3}
                    <Button onClick={() => 
                        {book.ratings.rating_3 = book.ratings.rating_3 + 1;
                        book.ratings.count = book.ratings.count + 1;
                        api.updateRatingsByIsbn(book.isbn13, book.ratings);
                        location.reload();}}>+</Button></p>
                    <p> 4 Star Rating <Rating name="read-only" value={4} readOnly/> {book.ratings.rating_4}
                    <Button onClick={() => 
                        {book.ratings.rating_4 = book.ratings.rating_4 + 1;
                        book.ratings.count = book.ratings.count + 1;
                        api.updateRatingsByIsbn(book.isbn13, book.ratings);
                        location.reload();}}>+</Button></p>
                    <p> 5 Star Rating <Rating name="read-only" value={5} readOnly/> {book.ratings.rating_5}
                    <Button onClick={() => 
                        {book.ratings.rating_5 = book.ratings.rating_5 + 1;
                        book.ratings.count = book.ratings.count + 1;
                        api.updateRatingsByIsbn(book.isbn13, book.ratings);
                        location.reload();}}>+</Button></p>
                    </div>
                </Box>
            </Box>
        );
    };

    return (book) ? renderBook() : <p>No book found</p>;
}

export default BookDetails;