import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import React, { useState } from 'react';
import { IBook } from 'src/core/model/book.model';


function BookForm({ onSubmit }: { onSubmit: (formData: IBook) => void }) {
    const [formData, setFormData] = useState<IBook>({
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
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <TextField label="ISBN" value={formData.isbn13} onChange={handleChange} type="number" name="isbn13" />
            <TextField label="Authors" value={formData.authors} onChange={handleChange} name="authors" />
            <TextField label="Publication Year" value={formData.publication} onChange={handleChange} type="number" name="publication" />
            <TextField label="Original Title" value={formData.original_title} onChange={handleChange} name="original_title" />
            <TextField label="Title" value={formData.title} onChange={handleChange} name="title" />

            <TextField label="Large Icon URL" value={formData.icons.large} onChange={handleChange} name="large" />
            <TextField label="Small Icon URL" value={formData.icons.small} onChange={handleChange} name="small" />

            <TextField label="Average Rating" value={formData.ratings.average} onChange={handleRatingsChange} type="number" name="average" />
            <TextField label="Rating Count" value={formData.ratings.count} onChange={handleRatingsChange} type="number" name="count" />
            <TextField label="1 Star Ratings" value={formData.ratings.rating_1} onChange={handleRatingsChange} type="number" name="rating_1" />
            <TextField label="2 Star Ratings" value={formData.ratings.rating_2} onChange={handleRatingsChange} type="number" name="rating_2" />
            <TextField label="3 Star Ratings" value={formData.ratings.rating_3} onChange={handleRatingsChange} type="number" name="rating_3" />
            <TextField label="4 Star Ratings" value={formData.ratings.rating_4} onChange={handleRatingsChange} type="number" name="rating_4" />
            <TextField label="5 Star Ratings" value={formData.ratings.rating_5} onChange={handleRatingsChange} type="number" name="rating_5" />

            <Button type="submit" variant="contained">Submit</Button>
            <Button type="reset" variant="contained">Reset</Button>
        </form>
    );
};

export default BookForm;
