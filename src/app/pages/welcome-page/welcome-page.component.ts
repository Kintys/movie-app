import { Component, OnDestroy, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { RouterLink } from '@angular/router'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent, RouterLink],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieData!: Movie[]
    constructor(private movieAPIService: MovieAPIService) {}
    ngOnInit(): void {
        this.sub = this.movieAPIService.getAllMovies().subscribe({
            next: (movieList) => (this.movieData = movieList)
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
