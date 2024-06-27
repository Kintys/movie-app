import { Component, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
    movieData!: Movie[]
    constructor(private welcomeData: MovieDataBaseService) {}
    ngOnInit(): void {
        this.movieData = this.welcomeData.getAllMovies()
    }
}
