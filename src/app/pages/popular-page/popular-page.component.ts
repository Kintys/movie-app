import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { Component } from '@angular/core'

@Component({
    selector: 'app-popular-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './popular-page.component.html',
    styleUrl: './popular-page.component.scss'
})
export class PopularPageComponent {
    movieData: Movie[] = movieDataBase.getPopularList().reverse()
}
