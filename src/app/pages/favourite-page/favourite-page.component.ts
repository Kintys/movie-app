import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Subscription } from 'rxjs'
@Component({
    selector: 'app-favourite-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './favourite-page.component.html',
    styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    favouriteList!: Movie[]
    constructor(private favouriteData: FavouriteAndWatchDataService, private favouriteApi: MovieAPIService) {}
    ngOnInit() {
        this.favouriteData.getFavouriteMoviesListSubject().subscribe({
            next: (movie) => (this.favouriteList = movie)
        })
        this.favouriteApi.getFavouriteListFromApi()
    }
    deleteItemById(id: string | number) {
        this.favouriteApi.deleteItemFromFavouriteList(id)
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
