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

export class FavoriteSearch {
    favoriteString: string;
    counter: number;
}
