import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { selectMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-now-playing-page',
    standalone: true,
    imports: [MovieCardComponent, AsyncPipe],
    templateUrl: './now-playing-page.component.html',
    styleUrl: './now-playing-page.component.scss'
})
export class NowPlayingPageComponent {
    selectedMovieList$ = this.store.select(selectMovieList)
    constructor(private store: Store) {}
}
