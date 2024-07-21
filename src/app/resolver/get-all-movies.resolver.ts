import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectCategoryType } from '../store/movie-store/movieSelector'
import { loadAllMovies } from '../store/movie-store/movieActions'

export const getAllMoviesResolver: ResolveFn<boolean> = () => {
    const store = inject(Store)
    store.select(selectCategoryType).subscribe((cat) => store.dispatch(loadAllMovies({ categoryObj: cat })))
    return true
}
