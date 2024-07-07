import { Component, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { RouterLink } from '@angular/router'
import { MovieAPIService } from '@/app/services/movie-api.service'
@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent, RouterLink],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
    movieData!: Movie[]
    constructor(private welcomeData: MovieAPIService) {}
    ngOnInit(): void {
        this.welcomeData.getAllMovies().subscribe({
            next: (movieList) => (this.movieData = movieList)
        })
    }
}
