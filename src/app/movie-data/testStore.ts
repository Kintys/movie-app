import { Movie } from './type-declorate'
// Даний підхід є не найкращим виходом з положення, але так як ми ще не проходили Store і Services. Був створений клас для взаемодії між собою компонентів.

export class MovieData {
    nowPlaying: Movie[]
    topRatedMovies: Movie[]
    upcomingMovies: Movie[]
    popularMovies: Movie[]
    constructor(nowPlaying: Movie[], popularMovies: Movie[], topRatedMovies: Movie[], upcomingMovies: Movie[]) {
        this.nowPlaying = nowPlaying
        this.popularMovies = popularMovies
        this.topRatedMovies = topRatedMovies
        this.upcomingMovies = upcomingMovies
    }

    public getPlayingList() {
        return this.nowPlaying
    }
    public getPopularList() {
        return this.popularMovies
    }
    public getTopList() {
        return this.topRatedMovies
    }
    public getUpcomingList() {
        return this.upcomingMovies
    }
    public getAllMovies(): Movie[] {
        return [...this.getPlayingList(), ...this.getPlayingList(), ...this.getTopList(), ...this.getUpcomingList()]
    }
    public getItemById(id: number | string) {
        const movieArr = this.getAllMovies()
        return movieArr.find((item) => item.id == id)
    }

    public setItemToPlayingList(value: Movie) {
        if (!value) return
        const copyVal = this.getCopyItem(value)
        this.nowPlaying.push(copyVal)
    }
    public setItemToTopList(value: Movie) {
        if (!value) return
        const copyVal = this.getCopyItem(value)
        this.topRatedMovies.push(copyVal)
    }
    public setItemToUpcomingList(value: Movie) {
        if (!value) return
        const copyVal = this.getCopyItem(value)
        this.upcomingMovies.push(copyVal)
    }
    public setItemToPopularList(value: Movie) {
        if (!value) return
        const copyVal = this.getCopyItem(value)
        this.upcomingMovies.push(copyVal)
    }
    private getCopyItem(val: Movie) {
        return JSON.parse(JSON.stringify(val))
    }
}
export class FavouriteAndWatchData {
    private favouriteList: Movie[]
    private watchList: Movie[]
    private movieList: Movie[]
    constructor(movieList: Movie[]) {
        this.favouriteList = []
        this.watchList = []
        this.movieList = movieList
    }
    public getFavouriteList() {
        return this.favouriteList
    }
    public getWatchList() {
        return this.watchList
    }
    setItemToFavouriteList(id: string | number) {
        const foundItem = this.movieList.find((movie) => movie.id == id)
        if (!foundItem || this.checkItemInList(foundItem, this.favouriteList)) return
        else this.favouriteList.push(this.getCopyItem(foundItem))
    }
    setItemToWatchList(id: string | number) {
        const foundItem = this.movieList.find((movie) => movie.id == id)
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
