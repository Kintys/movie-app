import { Injectable } from '@angular/core'
import { Movie } from '../movie-data/type-declorate'
import { HttpClient } from '@angular/common/http'
import { Observable, combineLatest, map } from 'rxjs'
@Injectable({
    providedIn: 'root'
})

// В даному підході використовуються локальний Json-server
// --------------- Коротка інструкція використання -------------------
// 1) Всі мокові данні знаходиться в файлі db.json (movie-app/db.json)
// 2) Встанолення -  npm install json-server (https://www.npmjs.com/package/json-server)
// 3) Запуск сервера - окремий термінал -> npm run backend
export class MovieDataBaseService {
    nowPlayData = this.http.get<Movie[]>('http://localhost:3000/nowPlayingMovies')
    topRateData = this.http.get<Movie[]>('http://localhost:3000/popularMovies')
    popularData = this.http.get<Movie[]>('http://localhost:3000/topRatedMovies')
    upcomingData = this.http.get<Movie[]>('http://localhost:3000/upcomingMovies')
    allMovies = this.http.get<Movie[]>('http://localhost:3000')

    constructor(private http: HttpClient) {}

    public getPlayingList(): Observable<Movie[]> {
        return this.nowPlayData
    }
    public getPopularList(): Observable<Movie[]> {
        return this.popularData
    }
    public getTopList(): Observable<Movie[]> {
        return this.topRateData
    }
    public getUpcomingList(): Observable<Movie[]> {
        return this.upcomingData
    }
    // Є сумніви що до даного рішення і повторного запиту на сервер
    public getAllMovies(): Observable<Movie[]> {
        return combineLatest([
            this.getPlayingList(),
            this.getPopularList(),
            this.getTopList(),
            this.getUpcomingList()
        ]).pipe(
            map(([playing, popular, top, upcoming]) =>
                Array.from(new Set([...playing, ...popular, ...top, ...upcoming]))
            )
        )
    }
}
