import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie, MoviePage } from '../movie-data/type-declorate'
import { Observable, combineLatest, map, tap } from 'rxjs'
import { environment } from '@/environments/environment.development'
import { FavouriteAndWatchDataService } from './favourite-and-watch-data.service'
@Injectable({
    providedIn: 'root'
})
export class MovieAPIService {
    getWatchMovieListSubject() {
        throw new Error('Method not implemented.')
    }
    apiUrl = environment.apiUrl
    apiKey = environment.apiKey
    apiToken = environment.apiToken
    constructor(private http: HttpClient, private favouriteWatchServices: FavouriteAndWatchDataService) {}
    private get accountId() {
        return localStorage.getItem('accId')!
    }
    private get sessionId() {
        return localStorage.getItem('sessionId')!
    }
    public getPlayingList(): Observable<MoviePage> {
        return this.http.get<MoviePage>(`${this.apiUrl}movie/now_playing${this.apiKey}`)
    }
    public getPopularList(): Observable<MoviePage> {
        return this.http.get<MoviePage>(`${this.apiUrl}movie/popular${this.apiKey}`)
    }
    public getTopList(): Observable<MoviePage> {
        return this.http.get<MoviePage>(`${this.apiUrl}movie/top_rated${this.apiKey}`)
    }
    public getUpcomingList(): Observable<MoviePage> {
        return this.http.get<MoviePage>(`${this.apiUrl}movie/upcoming${this.apiKey}`)
    }
    public getAllMovies(): Observable<Movie[]> {
        return combineLatest([
            this.getPlayingList(),
            this.getPopularList(),
            this.getTopList(),
            this.getUpcomingList()
        ]).pipe(
            map(([playing, popular, top, upcoming]) =>
                Array.from(new Set([...playing.results, ...popular.results, ...top.results, ...upcoming.results]))
            )
        )
    }
    public getFavouriteListFromApi() {
        this.http
            .get<MoviePage>(
                `${this.apiUrl}account/${this.accountId}/favorite/movies?language=en-US&page=1&session_id=${this.sessionId}&sort_by=created_at.asc`,
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: (movieList) => this.favouriteWatchServices.setFavouriteMoviesList(movieList.results),
                error: (err) => console.log(err)
            })
    }
    public getWatchListFromApi() {
        this.http
            .get<MoviePage>(
                `${this.apiUrl}account/${this.accountId}/watchlist/movies?language=en-US&page=1&session_id=${this.sessionId}&sort_by=created_at.asc`,
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: (movieList) => this.favouriteWatchServices.setWatchMoviesList(movieList.results),
                error: (err) => console.log(err)
            })
    }
    public setItemToFavouriteList(id: number | string) {
        this.http
            .post<Movie>(
                `${this.apiUrl}account/${this.accountId}/favorite`,
                { media_type: 'movie', media_id: id, favorite: true },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: (val) => this.favouriteWatchServices.addItemToFavouriteMoviesList(val),
                error(err) {
                    console.log(err)
                }
            })
    }
    public setItemToWatchList(id: number | string) {
        this.http
            .post<Movie>(
                `${this.apiUrl}account/${this.accountId}/watchlist`,
                { media_type: 'movie', media_id: id, watchlist: true },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: (val) => this.favouriteWatchServices.addItemToWatchMoviesList(val),
                error(err) {
                    console.log(err)
                }
            })
    }
    public deleteItemFromFavouriteList(id: number | string) {
        this.http
            .post<Movie>(
                `https://api.themoviedb.org/3/account/${this.accountId}/favorite`,
                { media_type: 'movie', media_id: id, favorite: false },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: () => this.favouriteWatchServices.removeItemFromFavouriteMoviesList(id),
                error: (err) => console.log(err)
            })
    }
    public deleteItemFromWatchList(id: number | string) {
        this.http
            .post<Movie>(
                `${this.apiUrl}account/${this.accountId}/watchlist`,
                { media_type: 'movie', media_id: id, watchlist: false },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe({
                next: () => this.favouriteWatchServices.removeItemFromWatchMoviesList(id),
                error: (err) => console.log(err)
            })
    }
}
