import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie, FavouriteSearch } from 'src/app/models/movie.model';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-movie-search',
    templateUrl: './movie-search.component.html',
    styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements AfterViewInit {
    hasResults = false;

    movies: Movie[] = [];
    selectedMovie: Movie;
    favouriteSearches: FavouriteSearch[] = [];
    isSearchFavourite = false;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(private moviesService: MoviesService) {}

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'input')
            .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
            .pipe(debounceTime(800))
            .pipe(distinctUntilChanged())
            .subscribe((queryString) => this.search(queryString));
    }

    setSearchAsFavorite(queryString) {
        // If the query string does not exists, we add it to favourite searches, then we sort descendingly
        if (queryString && !this.favouriteSearches.find((search) => search.searchString === queryString)) {
            this.favouriteSearches.push({ searchString: queryString, counter: 1 });
            this.isSearchFavourite = true;
        }
        this.favouriteSearches.sort((a, b) => b.counter - a.counter);
    }

    search(queryString) {
        if (queryString && queryString.length > 1)
            this.moviesService.searchMovie(queryString).subscribe((movies: Movie[]) => {
                this.movies = movies;
                this.hasResults = movies && movies.length > 0;
                if (this.hasResults) {
                    const searchItem = this.favouriteSearches.find((search) => search.searchString === queryString);
                    if (searchItem) {
                        this.isSearchFavourite = true;
                        searchItem.counter++;
                    } else this.isSearchFavourite = false;
                }
            });
        else {
            this.movies = [];
            this.hasResults = false;
            this.isSearchFavourite = false;
            this.selectedMovie = null;
        }
    }
}
