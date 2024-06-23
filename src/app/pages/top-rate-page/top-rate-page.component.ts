import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { Component } from '@angular/core'

@Component({
    selector: 'app-top-rate-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './top-rate-page.component.html',
    styleUrl: './top-rate-page.component.scss'
})
export class TopRatePageComponent {
    movieData: Movie[] = movieDataBase.getTopList()
}
