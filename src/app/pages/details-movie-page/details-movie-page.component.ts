import { Component, OnDestroy, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectMovieById } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-details-movie-page',
    standalone: true,
    imports: [ButtonModule, ImageModule, RatingModule, PrefixUrlPipe, PanelModule, FormsModule, AsyncPipe],
    templateUrl: './details-movie-page.component.html',
    styleUrl: './details-movie-page.component.scss'
})
export class DetailsMoviePageComponent {
    selectedMovieById$ = this.store.select(selectMovieById)
    constructor(private store: Store) {}
}
