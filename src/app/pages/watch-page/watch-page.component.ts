import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './watch-page.component.html',
    styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent implements OnInit {
    watchList!: Movie[]
    constructor(private watchData: FavouriteAndWatchDataService) {}
    ngOnInit(): void {
        this.watchList = this.watchData.getWatchList()
    }
}
