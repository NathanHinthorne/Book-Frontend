import React, { useState } from 'react';
import { IBook } from 'src/core/model/book.model';
import Input from '../Common/Input';


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
            <Input label="ISBN" value={formData.isbn13} onChange={handleChange} type="number" name="isbn13" />
            <Input label="Authors" value={formData.authors} onChange={handleChange} name="authors" />
            <Input label="Publication Year" value={formData.publication} onChange={handleChange} type="number" name="publication" />
            <Input label="Original Title" value={formData.original_title} onChange={handleChange} name="original_title" />
            <Input label="Title" value={formData.title} onChange={handleChange} name="title" />

            <Input label="Large Icon URL" value={formData.icons.large} onChange={handleChange} name="large" />
            <Input label="Small Icon URL" value={formData.icons.small} onChange={handleChange} name="small" />

            <Input label="Average Rating" value={formData.ratings.average} onChange={handleRatingsChange} type="number" name="average" />
            <Input label="Rating Count" value={formData.ratings.count} onChange={handleRatingsChange} type="number" name="count" />
            <Input label="Rating 1" value={formData.ratings.rating_1} onChange={handleRatingsChange} type="number" name="rating_1" />
            <Input label="Rating 2" value={formData.ratings.rating_2} onChange={handleRatingsChange} type="number" name="rating_2" />
            <Input label="Rating 3" value={formData.ratings.rating_3} onChange={handleRatingsChange} type="number" name="rating_3" />
            <Input label="Rating 4" value={formData.ratings.rating_4} onChange={handleRatingsChange} type="number" name="rating_4" />
            <Input label="Rating 5" value={formData.ratings.rating_5} onChange={handleRatingsChange} type="number" name="rating_5" />

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>
    );
};

export default BookForm;
