import { Component } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { RouterLink } from '@angular/router'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectAllMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent, RouterLink, AsyncPipe],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
    sub?: Subscription
    movieData?: Movie[]
    allMovieList$ = this.store.select(selectAllMovieList)
    constructor(private store: Store) {}
}
