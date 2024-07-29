import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { selectMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-upcoming-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './upcoming-page.component.html',
    styleUrl: './upcoming-page.component.scss'
})
export class UpcomingPageComponent {
    selectedMovieList$ = this.store.select(selectMovieList)
    constructor(private store: Store) {}
}
