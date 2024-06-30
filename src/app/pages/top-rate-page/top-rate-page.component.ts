import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'

import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-top-rate-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './top-rate-page.component.html',
    styleUrl: './top-rate-page.component.scss'
})
export class TopRatePageComponent implements OnInit {
    movieData!: Movie[]

    constructor(private topRateData: MovieDataBaseService) {}

    ngOnInit(): void {
        this.topRateData.getTopList().subscribe({
            next: (movieList) => (this.movieData = movieList)
        })
    }
}
