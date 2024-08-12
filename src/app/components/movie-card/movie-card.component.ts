import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { Movie } from '@/app/shared/type-declorate'
import { RouterLink } from '@angular/router'
import { TooltipModule } from 'primeng/tooltip'
import { Store } from '@ngrx/store'
import { addToFavouriteList, addToWatchList } from '@/app/store/movie-store/movieActions'
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
    @Input() showActionBar: boolean = true
    @Output() deleteItem = new EventEmitter<string | number>()
    public cardData: Movie | undefined
    ngOnInit() {
        this.cardData = this.dataValue
    }
    constructor(private store: Store) {}

    addItemToFavouriteList(id: number | string) {
        this.store.dispatch(addToFavouriteList({ movieId: id }))
    }
    addItemToWatchList(id: number | string) {
        this.store.dispatch(addToWatchList({ movieId: id }))
    }
    deleteItemById(id: number | string) {
        this.deleteItem.emit(id)
    }
}
