import { Injectable } from '@angular/core'
import { nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies } from '@/app/movie-data/mock-data'
import { Movie } from '../movie-data/type-declorate'
@Injectable({
    providedIn: 'root'
})

// Змінив testStore клас на сервіс
export class MovieDataBaseService {
    nowPlayData: Movie[] = nowPlayingMovies
    topRateData: Movie[] = topRatedMovies
    popularData: Movie[] = popularMovies
    upcomingData: Movie[] = upcomingMovies
    constructor() {}

    public getPlayingList() {
        return this.nowPlayData
    }
    public getPopularList() {
        return this.popularData
    }
    public getTopList() {
        return this.topRateData
    }
    public getUpcomingList() {
        return this.upcomingData
    }
    public getAllMovies(): Movie[] {
        return Array.from(
            new Set<Movie>([
                ...this.getPlayingList(),
                ...this.getPopularList(),
                ...this.getTopList(),
                ...this.getUpcomingList()
            ])
        )
    }
    public getItemById(id: number | string) {
        const movieArr = this.getAllMovies()
        return movieArr.find((item) => item.id == id)
    }

    public setItemToPlayingList(value: Movie) {
        if (!value || this.checkDoubleItemInList(value.id)) return
        const copyVal = this.getCopyItem(value)
        this.nowPlayData.push(copyVal)
    }
    public setItemToTopList(value: Movie) {
        if (!value || this.checkDoubleItemInList(value.id)) return
        const copyVal = this.getCopyItem(value)
        this.topRateData.push(copyVal)
    }
    public setItemToUpcomingList(value: Movie) {
        if (!value || this.checkDoubleItemInList(value.id)) return
        const copyVal = this.getCopyItem(value)
        this.popularData.push(copyVal)
    }
    public setItemToPopularList(value: Movie) {
        if (!value || this.checkDoubleItemInList(value.id)) return
        const copyVal = this.getCopyItem(value)
        this.upcomingData.push(copyVal)
    }
    private getCopyItem(val: Movie) {
        return JSON.parse(JSON.stringify(val))
    }
    private checkDoubleItemInList(idItem: number | string) {
        return this.getAllMovies().some((movie) => movie.id == idItem)
    }
}
