import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieSearch, Movie } from '../models/movie.model';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    API_URL = 'http://www.omdbapi.com/';
    API_KEY = '4b0905ec';
    constructor(private http: HttpClient) {}

    searchMovie(searchString: string): Observable<Movie[]> {
        return this.http.get(this.API_URL + '?s=' + searchString + '&apikey=' + this.API_KEY).pipe(
            map((movieSearch: MovieSearch) => {
                return movieSearch.Search;
            })
        );
    }
}
