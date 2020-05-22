export class MovieSearch {
    Search: Movie[];
    TotalResults: string;
    Response: true;
}
export class Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export class FavouriteSearch {
    searchString: string;
    counter: number;
}
