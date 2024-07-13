import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { Movie } from '@/app/movie-data/type-declorate'
import { RouterLink } from '@angular/router'
import { TooltipModule } from 'primeng/tooltip'
import { MovieAPIService } from '@/app/services/movie-api.service'
@Component({
    selector: 'app-movie-card',
    standalone: true,
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss',
    imports: [CardModule, ButtonModule, PrefixUrlPipe, RouterLink, TooltipModule]
})
export class MovieCardComponent implements OnInit {
    @Input() dataValue: Movie | undefined
    @Input() deleteCard: boolean = false
    @Output() deleteItem = new EventEmitter<string | number>()
    public cardData: Movie | undefined
    ngOnInit() {
        this.cardData = this.dataValue
    }
    constructor(private movieService: MovieAPIService) {}

    addItemToFavouriteList(id: number | string) {
        this.movieService.setItemToFavouriteList(id)
    }
    addItemToWatchList(id: number | string) {
        this.movieService.setItemToWatchList(id)
    }
    deleteItemById(id: number | string) {
        this.deleteItem.emit(id)
    }
}
