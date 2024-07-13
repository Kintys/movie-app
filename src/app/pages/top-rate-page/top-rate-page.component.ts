import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-top-rate-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './top-rate-page.component.html',
    styleUrl: './top-rate-page.component.scss'
})
export class TopRatePageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieData!: Movie[]

    constructor(private topRateData: MovieAPIService) {}

    ngOnInit(): void {
        this.topRateData.getTopList().subscribe({
            next: (movieList) => (this.movieData = movieList.results)
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
