import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { favouriteAndWatchDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
import { Component } from '@angular/core'

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './watch-page.component.html',
    styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent {
    watchData: Movie[] = favouriteAndWatchDataBase.getWatchList()
}
