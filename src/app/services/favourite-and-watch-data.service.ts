import { Injectable } from '@angular/core'
import { Movie } from '../movie-data/type-declorate'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class FavouriteAndWatchDataService {
    private favouriteMoviesList!: Movie[]
    favouriteListSubject$ = new BehaviorSubject<Movie[]>([])
    //===========================================================
    private watchMovieList!: Movie[]
    watchMovieListSubject$ = new BehaviorSubject<Movie[]>([])
    //===========================================================
    constructor() {}

    favourite$ = this.favouriteListSubject$.asObservable()

    watchList$ = this.watchMovieListSubject$.asObservable()

    public setFavouriteMoviesList(movieList: Movie[]) {
        this.favouriteMoviesList = [...movieList]
        this.updateFavouriteList(this.favouriteMoviesList)
    }
    public setWatchMoviesList(movieList: Movie[]) {
        this.watchMovieList = [...movieList]
        this.updateWatchList(this.watchMovieList)
    }
    public addItemToFavouriteMoviesList(movie: Movie) {
        this.favouriteMoviesList.push(movie)
        this.updateFavouriteList(this.favouriteMoviesList)
    }
    public addItemToWatchMoviesList(movie: Movie) {
        this.watchMovieList.push(movie)
        this.updateWatchList(this.watchMovieList)
    }
    public removeItemFromFavouriteMoviesList(id: number | string) {
        this.favouriteMoviesList = this.favouriteMoviesList.filter((movie) => movie.id !== id)
        this.updateFavouriteList(this.favouriteMoviesList)
    }
    public removeItemFromWatchMoviesList(id: number | string) {
        this.watchMovieList = this.watchMovieList.filter((movie) => movie.id !== id)
        this.updateWatchList(this.watchMovieList)
    }
    private updateFavouriteList(movie: Movie[]) {
        this.favouriteListSubject$.next(movie)
    }
    private updateWatchList(movie: Movie[]) {
        this.watchMovieListSubject$.next(movie)
    }
}
