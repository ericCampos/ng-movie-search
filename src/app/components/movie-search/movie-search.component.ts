import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie, FavoriteSearch } from 'src/app/models/movie.model';
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
    favoriteSearches: FavoriteSearch[] = [];
    isSearchFavorite = false;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(private moviesService: MoviesService) {}

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'input')
            .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
            .pipe(debounceTime(800))
            .pipe(distinctUntilChanged())
            .subscribe((queryString) => this.search(queryString));
    }

    setSearchAsFavorite(queryString: string) {
        // If the query string does not exists, we add it to favorite searches, then we sort descendingly.
        if (queryString && !this.findFavoriteSearch(queryString)) {
            this.favoriteSearches.push({ favoriteString: queryString, counter: 1 });
            this.isSearchFavorite = true;
        }
        this.sortFavoriteSearches();
    }

    search(queryString: string) {
        if (queryString && queryString.length > 1)
            this.moviesService.searchMovie(queryString).subscribe((movies: Movie[]) => {
                this.movies = movies;
                this.hasResults = movies && movies.length > 0;
                if (this.hasResults) {
                    const favoriteSearch = this.findFavoriteSearch(queryString);
                    if (favoriteSearch) {
                        this.isSearchFavorite = true;
                        favoriteSearch.counter++;
                        this.sortFavoriteSearches();
                    } else this.isSearchFavorite = false;
                }
            });
        else {
            this.movies = [];
            this.hasResults = false;
            this.isSearchFavorite = false;
            this.selectedMovie = null;
        }
    }

    sortFavoriteSearches() {
        this.favoriteSearches.sort((a, b) => b.counter - a.counter);
    }

    /**
     * Passing a string as a parameter, returns the favorite string object if found, else returns null.
     * @param searchString String to search.
     * @return Favorite search object or null.
     */
    findFavoriteSearch(searchString: string) {
        return this.favoriteSearches.find((favoriteSearch) => favoriteSearch.favoriteString === searchString);
    }
}
