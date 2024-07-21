import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { loadMovieID } from '../store/movie-store/movieActions'

export const getMovieById: ResolveFn<boolean> = (route) => {
    const id = Number(route.paramMap.get('id'))
    const store = inject(Store)
    if (id) store.dispatch(loadMovieID({ movieId: id }))
    return true
}
