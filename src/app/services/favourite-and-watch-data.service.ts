import { Injectable } from '@angular/core'
import { Movie } from '../movie-data/type-declorate'
import { Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class FavouriteAndWatchDataService {
    private favouriteMoviesList!: Movie[]
    favouriteListSubject = new Subject<Movie[]>()
    //===========================================================
    private watchMovieList!: Movie[]
    watchMovieListSubject = new Subject<Movie[]>()
    //===========================================================
    constructor() {}

    public get getFavouriteMoviesList() {
        return this.favouriteMoviesList
    }
    public get getWatchMovieList() {
        return this.watchMovieList
    }
    public getFavouriteMoviesListSubject() {
        return this.favouriteListSubject
    }
    public getWatchMovieListSubject() {
        return this.watchMovieListSubject
    }
    public set setFavouriteMoviesList(movieList: Movie[]) {
        this.favouriteMoviesList = [...movieList]
        this.favouriteListSubject.next(this.getFavouriteMoviesList)
    }
    public set setWatchMoviesList(movieList: Movie[]) {
        this.watchMovieList = [...movieList]
        this.watchMovieListSubject.next(this.getWatchMovieList)
    }
    addItemToFavouriteMoviesList(movie: Movie) {
        this.favouriteMoviesList.push(movie)
        this.favouriteListSubject.next(this.getFavouriteMoviesList)
    }
    addItemToWatchMoviesList(movie: Movie) {
        this.watchMovieList.push(movie)
        this.watchMovieListSubject.next(this.getWatchMovieList)
    }
    removeItemFromFavouriteMoviesList(id: number | string) {
        this.setFavouriteMoviesList = this.favouriteMoviesList.filter((movie) => movie.id !== id)
    }
    removeItemFromWatchMoviesList(id: number | string) {
        this.setWatchMoviesList = this.watchMovieList.filter((movie) => movie.id !== id)
    }
}
