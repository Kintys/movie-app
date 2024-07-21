import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { deleteMovieFromWatchList } from '@/app/store/movie-store/movieActions'
import { selectWatchList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './watch-page.component.html',
    styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent {
    selectedWatchList$ = this.store.select(selectWatchList)
    constructor(private store: Store) {}
    deleteItemById(id: string | number) {
        this.store.dispatch(deleteMovieFromWatchList({ movieId: id }))
    }
}
