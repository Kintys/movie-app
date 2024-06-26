import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { TooltipModule } from 'primeng/tooltip'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import { Movie } from '@/app/movie-data/type-declorate'
import { movieDataBase } from '@/app/movie-data/mock-data'
import { ActivatedRoute, Router } from '@angular/router'
import { favouriteAndWatchDataBase } from '@/app/movie-data/mock-data'

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
    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('id')) this.id = +params.get('id')!
            this.movieItem = movieDataBase.getItemById(this.id)
        })
    }
    // кастомний стор подробніше в файлі movie-data/testStore
    addItemToFavouriteList(id: number) {
        favouriteAndWatchDataBase.setItemToFavouriteList(id)
    }
    addItemToWatchList(id: number) {
        favouriteAndWatchDataBase.setItemToWatchList(id)
    }
}
