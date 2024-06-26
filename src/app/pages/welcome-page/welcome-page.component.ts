import { Component } from '@angular/core'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
    movieData: Movie[] = movieDataBase.getAllMovies()
}
