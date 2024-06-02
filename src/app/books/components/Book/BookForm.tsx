import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import React, { useState } from 'react';
import { IBook, ICreatedBook } from 'src/core/model/book.model';
import styles from './Button.module.css';
import { Box, Grid, ThemeProvider } from '@mui/material';
import darkTheme from "@/app/books/view/theme";


function BookForm({ onSubmit }: { onSubmit: (formData: ICreatedBook) => void }) {

    const initialFormData: ICreatedBook = {
        isbn13: 0,
        authors: '',
        publication_year: 0,
        original_title: '',
        title: '',
        rating_avg: 0,
        rating_count: 0,
        rating_1_star: 0,
        rating_2_star: 0,
        rating_3_star: 0,
        rating_4_star: 0,
        rating_5_star: 0,
        image_url: '',
        image_small_url: '',
    };

    const [formData, setFormData] = useState<ICreatedBook>(initialFormData);

    const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseInt(value),
        });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // if any field is empty, return
        if (formData.authors === '' || formData.publication_year === 0
            || formData.original_title === '' || formData.title === '') {
            alert('Top two rows must be filled out');
            return;
        }

        // if isbn is not exactly 13 digits, return
        if (formData.isbn13.toString().length !== 13) {
            alert('ISBN must be 13 digits');
            return;
        }

        // if any rating is negative, return
        if (formData.rating_1_star < 0 || formData.rating_2_star < 0
            || formData.rating_3_star < 0 || formData.rating_4_star < 0
            || formData.rating_5_star < 0) {
            alert('Ratings must be positive');
            return;
        }


        // calculate total count
        const rating_1 = formData.rating_1_star;
        const rating_2 = formData.rating_2_star;
        const rating_3 = formData.rating_3_star;
        const rating_4 = formData.rating_4_star;
        const rating_5 = formData.rating_5_star;
        const total = rating_1 + rating_2 + rating_3 + rating_4 + rating_5;

        // calculate average, where 1 star = 1, 2 star = 2, 3 star = 3, 4 star = 4, 5 star = 5
        const average = (rating_1 + rating_2 * 2 + rating_3 * 3 + rating_4 * 4 + rating_5 * 5) / total;
        const roundedAverage = Math.round(average * 100) / 100;

        if (formData.image_small_url === '') {
            // default image when no small book icon is provided
            formData.image_small_url = 'https://ibb.co/m0fy2y6';
        }

        if (formData.image_url === '') {
            // default image
            formData.image_url = 'https://ibb.co/m0fy2y6';
        }

        setFormData({
            ...formData,
            rating_avg: roundedAverage,
            rating_count: total,
        });

        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    const cancelButtonStyle = {
        backgroundColor: '#F8847C',
        color: 'black',
        border: '4px solid #F44336'
    }

    const submitButtonStyle = {
        backgroundColor: '#A5D6A7',
        color: 'black',
        border: '4px solid #4CAF50'
    }

    const boxStyle = {
        backgroundColor: darkTheme.palette.secondary.main,
        padding: '20px',
        margin: 'auto',
        border: '2px solid ' + darkTheme.palette.secondary.light,
        borderRadius: '10px',
        height: '400px',
    }



    return (
        <ThemeProvider theme={darkTheme}>

            <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" style={boxStyle}>
                <form onSubmit={handleSubmit} >
                    <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                        <TextField label="ISBN" value={formData.isbn13} onChange={handleNumberChange} type="number" name="isbn13" />
                        <TextField label="Authors" value={formData.authors} onChange={handleStringChange} name="authors" />
                        <TextField label="Publication Year" value={formData.publication_year} onChange={handleNumberChange} type="number" name="publication_year" />
                        <TextField label="Original Title" value={formData.original_title} onChange={handleStringChange} name="original_title" />
                        <TextField label="Title" value={formData.title} onChange={handleStringChange} name="title" />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                        <TextField label="1 Star Ratings" value={formData.rating_1_star} onChange={handleNumberChange} type="number" name="rating_1_star" />
                        <TextField label="2 Star Ratings" value={formData.rating_2_star} onChange={handleNumberChange} type="number" name="rating_2_star" />
                        <TextField label="3 Star Ratings" value={formData.rating_3_star} onChange={handleNumberChange} type="number" name="rating_3_star" />
                        <TextField label="4 Star Ratings" value={formData.rating_4_star} onChange={handleNumberChange} type="number" name="rating_4_star" />
                        <TextField label="5 Star Ratings" value={formData.rating_5_star} onChange={handleNumberChange} type="number" name="rating_5_star" />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                        <TextField label="Large Icon URL" value={formData.image_url} onChange={handleStringChange} name="image_url" />
                        <TextField label="Small Icon URL" value={formData.image_small_url} onChange={handleStringChange} name="image_small_url" />
                    </Box>

                    <Box display={"flex"} justifyContent={"space-between"} margin={2}>
                        <Button type="button" variant="contained" style={cancelButtonStyle} onClick={handleReset}>Reset</Button>
                        <Button type="submit" variant="contained" style={submitButtonStyle}>Submit</Button>
                    </Box>
                </form >
            </Box>
        </ThemeProvider>
    );
};

export default BookForm;
