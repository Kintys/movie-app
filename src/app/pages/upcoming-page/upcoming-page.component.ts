import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-upcoming-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './upcoming-page.component.html',
    styleUrl: './upcoming-page.component.scss'
})
export class UpcomingPageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieData!: Movie[]
    constructor(private upcomingData: MovieAPIService) {}
    ngOnInit(): void {
        this.upcomingData.getUpcomingList().subscribe({
            next: (movieList) => (this.movieData = movieList.results)
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
