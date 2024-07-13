import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './watch-page.component.html',
    styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    watchList?: Movie[]
    constructor(
        private favouriteAndWatchDataService: FavouriteAndWatchDataService,
        private movieAPIService: MovieAPIService
    ) {}
    ngOnInit() {
        this.sub = this.favouriteAndWatchDataService.watchList$.subscribe({
            next: (movie) => (this.watchList = movie)
        })
        this.movieAPIService.getWatchListFromApi()
    }
    deleteItemById(id: string | number) {
        this.movieAPIService.deleteItemFromWatchList(id)
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
