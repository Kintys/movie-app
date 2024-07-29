import { createSelector, createFeatureSelector } from '@ngrx/store'
import { MovieState } from './movieState'
import { CategoryMovies } from '@/app/movie-data/type-declorate'

export const selectMovie = createFeatureSelector<MovieState>('movieState')

export const selectCategoryType = createSelector(selectMovie, (state): CategoryMovies => state.categoryMovies)

export const selectMovieList = createSelector(selectMovie, (state) => state.moviesListWithCat)

export const selectAllMovieList = createSelector(selectMovie, (state) => state.allMoviesList)

export const selectMovieById = createSelector(selectMovie, (state) =>
    state.allMoviesList?.find((movie) => movie.id === state.movieId)
)
export const selectFavouriteList = createSelector(selectMovie, (state) => state.favouriteList)

export const selectWatchList = createSelector(selectMovie, (state) => state.watchList)

export const selectSuccessStatus = createSelector(selectMovie, (state) => state.success)
