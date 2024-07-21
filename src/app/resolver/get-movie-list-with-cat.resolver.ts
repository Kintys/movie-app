import { ResolveFn } from '@angular/router'
import { selectCategoryType } from '@/app/store/movie-store/movieSelector'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs'
import { loadMoviesListWithCat } from '../store/movie-store/movieActions'
import { CategoryMovies } from '../movie-data/type-declorate'

export const getMovieLIstWithCat: ResolveFn<boolean> = (route) => {
    const store = inject(Store)
    const catName = route.url.toString()
    store
        .select(selectCategoryType)
        .pipe(
            map((categoryObj: CategoryMovies) => categoryObj[catName]),
            tap((category: string) => {
                if (category) {
                    store.dispatch(loadMoviesListWithCat({ category: category }))
                }
            })
        )
        .subscribe()
    return true
}
