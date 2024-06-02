export interface IRatings {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
}

export interface IUrlIcon {
    large: string;
    small: string;
}

export interface IBook {
    isbn13: number;
    authors: string;
    publication: number;
    original_title: string;
    title: string;
    ratings: IRatings;
    icons: IUrlIcon;
}

export interface ICreatedBook {
    isbn13: number;
    authors: string;
    publication_year: number;
    original_title: string;
    title: string;
    rating_avg: number;
    rating_count: number;
    rating_1_star: number;
    rating_2_star: number;
    rating_3_star: number;
    rating_4_star: number;
    rating_5_star: number;
    image_url: string;
    image_small_url: string;
}