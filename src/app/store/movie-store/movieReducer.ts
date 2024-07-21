import { createReducer, on } from '@ngrx/store'
import { initialState } from './movieState'
import {
    addToFavouriteListFailure,
    addToFavouriteListSuccess,
    addToWatchListFailure,
    addToWatchListSuccess,
    deleteMovieFromFavouriteListFailure,
    deleteMovieFromFavouriteListSuccess,
    deleteMovieFromWatchListFailure,
    deleteMovieFromWatchListSuccess,
    deleteSuccessStatus,
    loadAllMoviesSuccess,
    loadFavouriteListFailure,
    loadFavouriteListSuccess,
    loadMovieID,
    loadMoviesListWithCatFailure,
    loadMoviesListWithCatSuccess,
    loadWatchList,
    loadWatchListFailure,
    loadWatchListSuccess
} from './movieActions'
import { Movie } from '@/app/movie-data/type-declorate'
export const MovieReducer = createReducer(
    initialState,
    // movie list
    on(loadMoviesListWithCatSuccess, (state, { movies }) => {
        return {
            ...state,
            moviesListWithCat: getCopyItem(movies)
        }
    }),

    on(loadMoviesListWithCatFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(loadMovieID, (state, { movieId }) => {
        return {
            ...state,
            movieId: movieId
        }
    }),
    // all movie list
    on(loadAllMoviesSuccess, (state, { movies }) => {
        let moviesArr: Movie[] = []
        if (movies) {
            movies.forEach((movie) => {
                moviesArr.push(...movie.results)
            })
            // фільтрація масиву для уникнення повторення фільму
            // незрозуміло чому не працює new Set
            moviesArr = moviesArr.filter((movie, index, arr) => index === arr.findIndex((m) => m.id === movie.id))
        }
        return {
            ...state,
            allMoviesList: moviesArr
        }
    }),
    // favourite List
    on(loadFavouriteListSuccess, (state, { favouriteList }) => {
        return {
            ...state,
            favouriteList: favouriteList
        }
    }),
    on(loadFavouriteListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(addToFavouriteListSuccess, (state, { success }) => {
        return {
            ...state,
            success: success
        }
    }),
    on(addToFavouriteListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(deleteMovieFromFavouriteListSuccess, (state, { success }) => {
        return {
            ...state,
            success: success
        }
    }),
    on(deleteMovieFromFavouriteListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    //watch list
    on(loadWatchListSuccess, (state, { watchList }) => {
        return {
            ...state,
            watchList: watchList
        }
    }),
    on(loadWatchListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(addToWatchListSuccess, (state, { success }) => {
        return {
            ...state,
            success: success
        }
    }),
    on(addToWatchListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(deleteMovieFromWatchListSuccess, (state, { success }) => {
        return {
            ...state,
            success: success
        }
    }),
    on(deleteMovieFromWatchListFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    //success status
    on(deleteSuccessStatus, (state) => {
        return {
            ...state,
            success: ''
        }
    })
)

function getCopyItem(val: any) {
    return JSON.parse(JSON.stringify(val))
}
