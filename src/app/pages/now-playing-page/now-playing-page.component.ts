import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-now-playing-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './now-playing-page.component.html',
    styleUrl: './now-playing-page.component.scss'
})
export class NowPlayingPageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieData!: Movie[]
    constructor(private nowPlayingDataBase: MovieAPIService) {}

    ngOnInit(): void {
        this.sub = this.nowPlayingDataBase.getPlayingList().subscribe({
            next: (movie) => (this.movieData = movie.results)
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
