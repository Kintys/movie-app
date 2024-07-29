import { CategoryMovies, Movie, MoviePage } from '@/app/movie-data/type-declorate'
import { createAction, props } from '@ngrx/store'

// MovieList
export const loadMoviesListWithCat = createAction(
    '[MoviesList] Load Movies List With Category',
    props<{ category: string | null }>()
)

export const loadMoviesListWithCatSuccess = createAction(
    '[MoviesList] Load Movies List With Category Success!',
    props<{ movies: Movie[] | null }>()
)

export const loadMoviesListWithCatFailure = createAction(
    '[MoviesList] Load Movies List With Category Failure!',
    props<{ error: any }>()
)

// Movie ID
export const loadMovieID = createAction('[All Movies] Load Movie ID', props<{ movieId: string | number | null }>())

// All category movies
export const loadAllMovies = createAction('[All Movies] Load All Movies', props<{ categoryObj: CategoryMovies }>())

export const loadAllMoviesSuccess = createAction(
    '[MoviesList] Load All Movies Success!',
    props<{ movies: MoviePage[] | null }>()
)

export const loadAllMoviesFailure = createAction('[All Movies] Load All Movies Failure!', props<{ error: any }>())

// favouriteList

export const loadFavouriteList = createAction('[FavouriteList] Load Favourite List')

export const loadFavouriteListSuccess = createAction(
    '[FavouriteList] Load Favourite List Success!',
    props<{ favouriteList: Movie[] | null }>()
)

export const loadFavouriteListFailure = createAction(
    '[FavouriteList] Load Favourite List Failure!',
    props<{ error: any }>()
)
export const addToFavouriteList = createAction(
    '[AddFavouriteList] Add To Favourite List',
    props<{ movieId: number | string }>()
)

export const addToFavouriteListSuccess = createAction(
    '[AddFavouriteList] Add To Favourite List Success!',
    props<{ success: string }>()
)

export const addToFavouriteListFailure = createAction(
    '[AddFavouriteList] Add To Favourite List Failure!',
    props<{ error: any }>()
)

export const deleteMovieFromFavouriteList = createAction(
    '[DeleteMovieFromFavouriteList] Delete Movie From Favourite List',
    props<{ movieId: number | string }>()
)

export const deleteMovieFromFavouriteListSuccess = createAction(
    '[DeleteMovieFromFavouriteList] Delete Movie From Favourite List Success!',
    props<{ success: string }>()
)

export const deleteMovieFromFavouriteListFailure = createAction(
    '[DeleteMovieFromFavouriteList] Delete Movie From Favourite List Failure!',
    props<{ error: any }>()
)

// watchList
export const loadWatchList = createAction('[WatchList] Load Watch List')

export const loadWatchListSuccess = createAction(
    '[WatchList] Load Watch List Success!',
    props<{ watchList: Movie[] | null }>()
)

export const loadWatchListFailure = createAction('[WatchList] Load Watch List Failure!', props<{ error: any }>())

export const addToWatchList = createAction('[AddToWatchList] Add To Watch List', props<{ movieId: number | string }>())

export const addToWatchListSuccess = createAction(
    '[AddToWatchList] Add To Watch List Success!',
    props<{ success: string }>()
)

export const addToWatchListFailure = createAction(
    '[AddToWatchList] Add To Watch List Failure!',
    props<{ error: any }>()
)

export const deleteMovieFromWatchList = createAction(
    '[DeleteMovieFromWatchList] Delete Movie From Watch List',
    props<{ movieId: number | string }>()
)

export const deleteMovieFromWatchListSuccess = createAction(
    '[DeleteMovieFromWatchList] Delete Movie From Watch List Success!',
    props<{ success: string }>()
)

export const deleteMovieFromWatchListFailure = createAction(
    '[DeleteMovieFromWatchList] Delete Movie From Watch ListFailure!',
    props<{ error: any }>()
)

// Success Status
export const deleteSuccessStatus = createAction('[Delete Success Status] Delete Success Status')
