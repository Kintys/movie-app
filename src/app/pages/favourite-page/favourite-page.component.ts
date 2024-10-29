import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { deleteMovieFromFavouriteList } from '@/app/store/movie-store/movieActions'
import { selectFavouriteList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-favourite-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './favourite-page.component.html',
    styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent {
    selectedFavouriteList$ = this.store.select(selectFavouriteList)
    constructor(private store: Store) {}
    deleteItemById(id: string | number) {
        this.store.dispatch(deleteMovieFromFavouriteList({ movieId: id }))
    }
}
