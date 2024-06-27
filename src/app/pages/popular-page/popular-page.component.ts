import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { MovieDataBaseService } from '@/app/services/movie-data-base.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-popular-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './popular-page.component.html',
    styleUrl: './popular-page.component.scss'
})
export class PopularPageComponent implements OnInit {
    movieData!: Movie[]

    constructor(private popularData: MovieDataBaseService) {}

    ngOnInit(): void {
        this.movieData = this.popularData.getPopularList().reverse()
    }
}
