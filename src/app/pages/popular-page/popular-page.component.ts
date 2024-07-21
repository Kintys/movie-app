import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { selectMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-popular-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './popular-page.component.html',
    styleUrl: './popular-page.component.scss'
})
export class PopularPageComponent {
    selectedMovieList$ = this.store.select(selectMovieList)
    constructor(private store: Store) {}
}
