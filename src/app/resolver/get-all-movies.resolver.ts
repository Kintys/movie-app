import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectCategoryType } from '../store/movie-store/movieSelector'
import { loadAllMovies } from '../store/movie-store/movieActions'
import { of, switchMap } from 'rxjs'

export const getAllMoviesResolver: ResolveFn<boolean> = () => {
    const store = inject(Store)
    return store.select(selectCategoryType).pipe(
        switchMap((cat) => {
            if (cat) store.dispatch(loadAllMovies({ categoryObj: cat }))
            return of(true)
        })
    )
}
