import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators'
import {
    loadMoviesListWithCat,
    loadMoviesListWithCatSuccess,
    loadMoviesListWithCatFailure,
    loadAllMovies,
    loadAllMoviesSuccess,
    loadAllMoviesFailure,
    loadFavouriteList,
    loadFavouriteListSuccess,
    loadFavouriteListFailure,
    addToFavouriteList,
    addToFavouriteListSuccess,
    addToFavouriteListFailure,
    deleteMovieFromFavouriteList,
    deleteMovieFromFavouriteListSuccess,
    deleteMovieFromFavouriteListFailure,
    loadWatchList,
    loadWatchListSuccess,
    addToWatchList,
    deleteMovieFromWatchList,
    addToWatchListSuccess,
    addToWatchListFailure,
    loadWatchListFailure,
    deleteMovieFromWatchListSuccess,
    deleteMovieFromWatchListFailure
} from '@/app/store/movie-store/movieActions'
import { of } from 'rxjs'
import { MovieAPIService } from '@/app/services/movie-api.service'

@Injectable()
export class MovieEffects {
    loadMoviesListWithCat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMoviesListWithCat),
            mergeMap((props) => {
                return this.movieAPIservices.getMovieListWitCat(props.category).pipe(
                    map((movies) =>
                        loadMoviesListWithCatSuccess({
                            movies: movies.results
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadMoviesListWithCatFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    loadAllMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAllMovies),
            mergeMap((props) => {
                return this.movieAPIservices.getAllMovies(props.categoryObj).pipe(
                    map((movies) =>
                        loadAllMoviesSuccess({
                            movies: movies
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadAllMoviesFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    loadFavouriteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFavouriteList),
            mergeMap(() => {
                return this.movieAPIservices.getFavouriteListFromApi().pipe(
                    map((movies) =>
                        loadFavouriteListSuccess({
                            favouriteList: movies.results
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadFavouriteListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    addToFavouriteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToFavouriteList),
            mergeMap((props) => {
                return this.movieAPIservices.setItemToFavouriteList(props.movieId).pipe(
                    map(() =>
                        addToFavouriteListSuccess({
                            success: 'Success! Movie add to your favourite list'
                        })
                    ),
                    catchError((error) =>
                        of(
                            addToFavouriteListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    deleteMovieFromFavouriteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteMovieFromFavouriteList),
            mergeMap((props) => {
                return this.movieAPIservices.deleteItemFromFavouriteList(props.movieId).pipe(
                    switchMap(() => [
                        deleteMovieFromFavouriteListSuccess({
                            success: 'Success! Movie delete from favourite list'
                        }),
                        loadFavouriteList()
                    ]),
                    catchError((error) =>
                        of(
                            deleteMovieFromFavouriteListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    loadWatchList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadWatchList),
            mergeMap(() => {
                return this.movieAPIservices.getWatchListFromApi().pipe(
                    map((movies) =>
                        loadWatchListSuccess({
                            watchList: movies.results
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadWatchListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    addToWatchList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToWatchList),
            mergeMap((props) => {
                return this.movieAPIservices.setItemToWatchList(props.movieId).pipe(
                    map(() =>
                        addToWatchListSuccess({
                            success: 'Success! Movie add to your watch list'
                        })
                    ),
                    catchError((error) =>
                        of(
                            addToWatchListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )
    deleteMovieFromWatchList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteMovieFromWatchList),
            mergeMap((props) => {
                return this.movieAPIservices.deleteItemFromWatchList(props.movieId).pipe(
                    switchMap(() => [
                        deleteMovieFromWatchListSuccess({
                            success: 'Success! Movie delete from watch list'
                        }),
                        loadWatchList()
                    ]),
                    catchError((error) =>
                        of(
                            deleteMovieFromWatchListFailure({
                                error: error
                            })
                        )
                    )
                )
            })
        )
    )

    constructor(private actions$: Actions, private movieAPIservices: MovieAPIService) {}
}
