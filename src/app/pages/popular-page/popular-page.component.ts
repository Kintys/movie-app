import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-popular-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './popular-page.component.html',
    styleUrl: './popular-page.component.scss'
})
export class PopularPageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieData!: Movie[]

    constructor(private popularData: MovieAPIService) {}

    ngOnInit(): void {
        this.sub = this.popularData.getPopularList().subscribe({
            next: (movieList) => (this.movieData = movieList.results)
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
