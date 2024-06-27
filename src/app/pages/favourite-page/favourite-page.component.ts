import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Component, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
@Component({
    selector: 'app-favourite-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './favourite-page.component.html',
    styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent implements OnInit {
    favouriteList!: Movie[]
    constructor(private favouriteData: FavouriteAndWatchDataService) {}
    ngOnInit(): void {
        this.favouriteList = this.favouriteData.getFavouriteList()
    }
}
