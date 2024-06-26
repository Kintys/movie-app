import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { Component } from '@angular/core'

@Component({
    selector: 'app-now-playing-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './now-playing-page.component.html',
    styleUrl: './now-playing-page.component.scss'
})
export class NowPlayingPageComponent {
    movieData: Movie[] = movieDataBase.getPlayingList()
}
