import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { selectMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-top-rate-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './top-rate-page.component.html',
    styleUrl: './top-rate-page.component.scss'
})
export class TopRatePageComponent {
    selectedMovieList$ = this.store.select(selectMovieList)
    constructor(private store: Store) {}
}
