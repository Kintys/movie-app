import { Injectable } from '@angular/core'
import { Movie } from '../movie-data/type-declorate'
import { MovieDataBaseService } from './movie-data-base.service'

// Змінив testStore клас на сервіс
@Injectable({
    providedIn: 'root'
})
export class FavouriteAndWatchDataService {
    favouriteList: Movie[] = []
    watchList: Movie[] = []
    constructor(private movieData: MovieDataBaseService) {}

    public getFavouriteList() {
        return this.favouriteList
    }
    public getWatchList() {
        return this.watchList
    }
    private getAllMovies() {
        return this.movieData.getAllMovies()
    }
    setItemToFavouriteList(id: string | number) {
        const foundItem = this.getAllMovies().find((movie) => movie.id == id)
        if (!foundItem || this.checkItemInList(foundItem, this.favouriteList)) return
        else this.favouriteList.push(this.getCopyItem(foundItem))
    }
    setItemToWatchList(id: string | number) {
        const foundItem = this.getAllMovies().find((movie) => movie.id == id)
        if (!foundItem || this.checkItemInList(foundItem, this.watchList)) return
        else this.watchList.push(this.getCopyItem(foundItem))
    }
    deleteItemFromFavouriteList(id: string | number) {
        this.favouriteList = this.favouriteList.filter((movie) => movie.id != id)
    }
    deleteItemFromWatchList(id: string | number) {
        this.watchList = this.watchList.filter((movie) => movie.id != id)
    }
    private getCopyItem(val: Movie) {
        return JSON.parse(JSON.stringify(val))
    }
    private checkItemInList(item: Movie, listArr: Movie[]) {
        return listArr.some((movie) => movie.id == item.id)
    }
}
