import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import React, { useState } from 'react';
import { IBook } from 'src/core/model/book.model';
import styles from './Button.module.css';
import { Box, Grid } from '@mui/material';


function BookForm({ onSubmit }: { onSubmit: (formData: IBook) => void }) {
    const initialFormData: IBook = {
        isbn13: 0,
        authors: '',
        publication: 0,
        original_title: '',
        title: '',
        ratings: {
            average: 0,
            count: 0,
            rating_1: 0,
            rating_2: 0,
            rating_3: 0,
            rating_4: 0,
            rating_5: 0,
        },
        icons: {
            large: '',
            small: '',
        },
    };

    const [formData, setFormData] = useState<IBook>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            ratings: {
                ...formData.ratings,
                [name]: Number(value),
            },
        });
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            icons: {
                ...formData.icons,
                [name]: value,
            },
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // calculate total count
        const rating_1 = formData.ratings.rating_1;
        const rating_2 = formData.ratings.rating_2;
        const rating_3 = formData.ratings.rating_3;
        const rating_4 = formData.ratings.rating_4;
        const rating_5 = formData.ratings.rating_5;
        const total = rating_1 + rating_2 + rating_3 + rating_4 + rating_5;

        // calculate average, where 1 star = 1, 2 star = 2, 3 star = 3, 4 star = 4, 5 star = 5
        const average = (rating_1 + rating_2 * 2 + rating_3 * 3 + rating_4 * 4 + rating_5 * 5) / total;

        setFormData({
            ...formData,
            ratings: {
                ...formData.ratings,
                average: average,
                count: total,
            },
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
        backgroundColor: '#BFE1FC',
        padding: '20px',
        margin: 'auto',
        border: '2px solid #2196F3',
        borderRadius: '10px',
        height: '400px',
    }



    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" style={boxStyle}>
            <form onSubmit={handleSubmit} >
                <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                    <TextField label="ISBN" value={formData.isbn13} onChange={handleChange} type="number" name="isbn13" />
                    <TextField label="Authors" value={formData.authors} onChange={handleChange} name="authors" />
                    <TextField label="Publication Year" value={formData.publication} onChange={handleChange} type="number" name="publication" />
                    <TextField label="Original Title" value={formData.original_title} onChange={handleChange} name="original_title" />
                    <TextField label="Title" value={formData.title} onChange={handleChange} name="title" />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                    <TextField label="1 Star Ratings" value={formData.ratings.rating_1} onChange={handleRatingsChange} type="number" name="rating_1" />
                    <TextField label="2 Star Ratings" value={formData.ratings.rating_2} onChange={handleRatingsChange} type="number" name="rating_2" />
                    <TextField label="3 Star Ratings" value={formData.ratings.rating_3} onChange={handleRatingsChange} type="number" name="rating_3" />
                    <TextField label="4 Star Ratings" value={formData.ratings.rating_4} onChange={handleRatingsChange} type="number" name="rating_4" />
                    <TextField label="5 Star Ratings" value={formData.ratings.rating_5} onChange={handleRatingsChange} type="number" name="rating_5" />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                    <TextField label="Large Icon URL" value={formData.icons.large} onChange={handleIconChange} name="large" />
                    <TextField label="Small Icon URL" value={formData.icons.small} onChange={handleIconChange} name="small" />
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} margin={2}>
                    <Button type="button" variant="contained" style={cancelButtonStyle} onClick={handleReset}>Reset</Button>
                    <Button type="submit" variant="contained" style={submitButtonStyle}>Submit</Button>
                </Box>
            </form >
        </Box>
    );
};

export default BookForm;
