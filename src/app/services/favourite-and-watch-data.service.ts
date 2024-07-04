import { Injectable } from '@angular/core'
import { Movie } from '../movie-data/type-declorate'
import { HttpClient } from '@angular/common/http'
import { switchMap, throwError } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
// В даному підході використовуються локальний Json-server
// --------------- Коротка інструкція використання -------------------
// 1) Всі мокові данні знаходиться в файлі db.json (movie-app/db.json)
// 2) Встанолення -  npm install json-server (https://www.npmjs.com/package/json-server)
// 3) Запуск сервера - окремий термінал -> npm run backend
export class FavouriteAndWatchDataService {
    favouriteList = this.http.get<Movie[]>('http://localhost:3000/favouriteList')
    watchList = this.http.get<Movie[]>('http://localhost:3000/watchList')
    constructor(private http: HttpClient) {}

    public getFavouriteList() {
        return this.favouriteList
    }
    public getWatchList() {
        return this.watchList
    }
    setItemToFavouriteList(movieVal: Movie) {
        this.getFavouriteList()
            .pipe(
                switchMap((movies) => {
                    const movieExists = movies.some((item) => item.id == movieVal.id)
                    if (movieExists) {
                        return throwError(() => new Error('Movie already in favourite list'))
                    } else {
                        return this.http.post<Movie>('http://localhost:3000/favouriteList', movieVal)
                    }
                })
            )
            .subscribe({
                next: (response) => {
                    console.log('Movie added to favourite list:', response)
                },
                error: (err) => {
                    console.error('Error:', err)
                }
            })
    }
    setItemToWatchList(movieVal: Movie) {
        this.getWatchList()
            .pipe(
                switchMap((movies) => {
                    const movieExists = movies.some((item) => item.id == movieVal.id)
                    if (movieExists) {
                        return throwError(() => new Error('Movie already in watch list'))
                    } else {
                        return this.http.post<Movie>('http://localhost:3000/watchList', movieVal)
                    }
                })
            )
            .subscribe({
                next: (response) => {
                    console.log('Movie added to watch list:', response)
                },
                error: (err) => {
                    console.error('Error:', err)
                }
            })
    }
    deleteItemFromFavouriteList(id: number | string) {
        return this.http.delete<Movie>('http://localhost:3000/favouriteList/' + id)
    }
    deleteItemFromWatchList(id: string | number) {
        return this.http.delete<Movie>('http://localhost:3000/watchList/' + id)
    }
}
