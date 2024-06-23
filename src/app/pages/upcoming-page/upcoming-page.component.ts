import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { Component } from '@angular/core'

@Component({
    selector: 'app-upcoming-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './upcoming-page.component.html',
    styleUrl: './upcoming-page.component.scss'
})
export class UpcomingPageComponent {
    movieData: Movie[] = movieDataBase.getUpcomingList().reverse()
}
