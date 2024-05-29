// to be used with BookForm.tsx

import { IRatings } from 'src/core/model/book.model';

function RatingStars({ ratings }: { ratings: IRatings }) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) { // stars from 1 to 5
            const rating = ratings[`rating_${i}` as keyof IRatings];
            stars.push(
                <span key={i}>
                    {i} star: {rating}
                </span>
            );
        }
        return stars;
    };

    return (
        <div>
            {renderStars()}
        </div>
    );
}

export default RatingStars;