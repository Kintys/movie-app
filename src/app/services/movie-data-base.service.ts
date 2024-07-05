import { Injectable } from '@angular/core'
import { Movie, MoviePage } from '../movie-data/type-declorate'
import { HttpClient } from '@angular/common/http'
import { Observable, combineLatest, map } from 'rxjs'
import { environment } from '../../environments/environment.development'
@Injectable({
    providedIn: 'root'
})
export class MovieDataBaseService {
    apiUrl = environment.apiUrl
    apiKey = environment.apiKey

    constructor(private http: HttpClient) {}

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
}
