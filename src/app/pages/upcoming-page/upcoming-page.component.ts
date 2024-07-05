import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'

import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-upcoming-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './upcoming-page.component.html',
    styleUrl: './upcoming-page.component.scss'
})
export class UpcomingPageComponent implements OnInit {
    movieData!: Movie[]
    constructor(private upcomingData: MovieDataBaseService) {}
    ngOnInit(): void {
        this.upcomingData.getUpcomingList().subscribe({
            next: (movieList) => (this.movieData = movieList.results)
        })
    }
}
