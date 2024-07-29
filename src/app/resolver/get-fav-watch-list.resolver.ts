import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadFavouriteList, loadWatchList } from '../store/movie-store/movieActions'

export const getFavWatchListResolver: ResolveFn<boolean> = (route, state) => {
    const store = inject(Store)
    store.dispatch(loadFavouriteList())
    store.dispatch(loadWatchList())
    return true
}
