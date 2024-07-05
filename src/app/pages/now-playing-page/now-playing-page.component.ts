import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-now-playing-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './now-playing-page.component.html',
    styleUrl: './now-playing-page.component.scss'
})
export class NowPlayingPageComponent implements OnInit {
    sub: any
    movieData!: Movie[]
    constructor(private nowPlayingDataBase: MovieDataBaseService) {}

    ngOnInit(): void {
        this.sub = this.nowPlayingDataBase.getPlayingList().subscribe({
            next: (movie) => (this.movieData = movie.results)
        })
    }
}
