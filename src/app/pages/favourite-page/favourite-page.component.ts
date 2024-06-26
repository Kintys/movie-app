import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Component } from '@angular/core'
import { favouriteAndWatchDataBase } from '@/app/movie-data/mock-data'
import { Movie } from '@/app/movie-data/type-declorate'
@Component({
    selector: 'app-favourite-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './favourite-page.component.html',
    styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent {
    favouriteData: Movie[] = favouriteAndWatchDataBase.getFavouriteList()
}
