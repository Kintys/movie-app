import { Injectable } from '@angular/core'
import { Movie, MoviePage, TokenModule } from '../movie-data/type-declorate'
import { HttpClient } from '@angular/common/http'
import { Observable, switchMap, throwError } from 'rxjs'
import { environment } from '@/environments/environment.development'

@Injectable({
    providedIn: 'root'
})
export class FavouriteAndWatchDataService {
    apiUrl = environment.apiUrl
    apiKey = environment.apiKey
    apiToken = environment.apiToken
    constructor(private http: HttpClient) {}
    public getFavouriteList(accountId: string, sessionId: string): Observable<MoviePage> {
        return this.http.get<MoviePage>(
            `${this.apiUrl}account/${accountId}/favorite/movies?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: this.apiToken
                }
            }
        )
    }
    public getWatchList(accountId: string, sessionId: string): Observable<MoviePage> {
        return this.http.get<MoviePage>(
            `${this.apiUrl}account/${accountId}/watchlist/movies?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: this.apiToken
                }
            }
        )
    }
    public setItemToFavouriteList(id: number | string, accountId: string) {
        this.http
            .post<Movie>(
                `${this.apiUrl}account/${accountId}/favorite`,
                { media_type: 'movie', media_id: id, favorite: true },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe((val) => console.log(val))
    }
    setItemToWatchList(id: number | string, accountId: string) {
        this.http
            .post<Movie>(
                `${this.apiUrl}account/${accountId}/watchlist`,
                { media_type: 'movie', media_id: id, watchlist: true },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: this.apiToken
                    }
                }
            )
            .subscribe((val) => console.log(val))
    }
    deleteItemFromFavouriteList(id: number | string, accountId: string) {
        return this.http.post<Movie>(
            `https://api.themoviedb.org/3/account/${accountId}/favorite`,
            { media_type: 'movie', media_id: id, favorite: false },
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: this.apiToken
                }
            }
        )
    }
    deleteItemFromWatchList(id: number | string, accountId: string) {
        return this.http.post<Movie>(
            `${this.apiUrl}account/${accountId}/watchlist`,
            { media_type: 'movie', media_id: id, watchlist: false },
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: this.apiToken
                }
            }
        )
    }
}
