import { Component, OnDestroy, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import { Movie } from '@/app/movie-data/type-declorate'
import { ActivatedRoute } from '@angular/router'
import { Subscription, map } from 'rxjs'
import { MovieAPIService } from '@/app/services/movie-api.service'

@Component({
    selector: 'app-details-movie-page',
    standalone: true,
    imports: [ButtonModule, ImageModule, RatingModule, PrefixUrlPipe, PanelModule, FormsModule],
    templateUrl: './details-movie-page.component.html',
    styleUrl: './details-movie-page.component.scss'
})
export class DetailsMoviePageComponent implements OnInit, OnDestroy {
    sub?: Subscription
    movieItem?: Movie
    id!: number
    constructor(private route: ActivatedRoute, private movieService: MovieAPIService) {}
    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            if (params.has('id')) this.id = +params.get('id')!
            this.movieService
                .getAllMovies()
                .pipe(map((movie) => movie.find((item) => item.id == this.id)))
                .subscribe({
                    next: (movie) => (this.movieItem = movie)
                })
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
