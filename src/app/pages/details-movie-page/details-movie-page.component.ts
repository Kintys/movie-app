import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { TooltipModule } from 'primeng/tooltip'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import { Movie } from '@/app/movie-data/type-declorate'
import { ActivatedRoute } from '@angular/router'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'
import { map } from 'rxjs'

@Component({
    selector: 'app-details-movie-page',
    standalone: true,
    imports: [ButtonModule, ImageModule, RatingModule, TooltipModule, PrefixUrlPipe, PanelModule, FormsModule],
    templateUrl: './details-movie-page.component.html',
    styleUrl: './details-movie-page.component.scss'
})
export class DetailsMoviePageComponent {
    movieItem?: Movie
    id!: number
    constructor(
        private route: ActivatedRoute,
        private fovouriteAndWatchListData: FavouriteAndWatchDataService,
        private movieDataBase: MovieDataBaseService
    ) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('id')) this.id = +params.get('id')!
            this.movieDataBase
                .getAllMovies()
                .pipe(map((movie) => movie.find((item) => item.id == this.id)))
                .subscribe({
                    next: (movie) => (this.movieItem = movie)
                })
        })
    }

    addItemToFavouriteList(id: number | string) {
        this.fovouriteAndWatchListData.setItemToFavouriteList(id, localStorage.getItem('accId')!)
    }
    addItemToWatchList(id: number | string) {
        this.fovouriteAndWatchListData.setItemToWatchList(id, localStorage.getItem('accId')!)
    }
}
