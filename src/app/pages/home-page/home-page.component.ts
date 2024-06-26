import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Component } from '@angular/core'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { RouterOutlet } from '@angular/router'
@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [MovieCardComponent, RouterOutlet],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    movieData: Movie[] = movieDataBase.getAllMovies()
}
