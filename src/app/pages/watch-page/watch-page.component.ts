import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { MovieAPIService } from '@/app/services/movie-api.service'
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
    constructor(private watchData: FavouriteAndWatchDataService, private watchApi: MovieAPIService) {}
    ngOnInit() {
        this.watchData.getWatchMovieListSubject().subscribe({
            next: (movie) => (this.watchList = movie)
        })
        this.watchApi.getWatchListFromApi()
    }
    deleteItemById(id: string | number) {
        this.watchApi.deleteItemFromWatchList(id)
    }
}
