import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { CardModule } from 'primeng/card'
import { RatingModule } from 'primeng/rating'
import { ButtonModule } from 'primeng/button'
import { FormsModule } from '@angular/forms'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { Movie } from '@/app/movie-data/type-declorate'
import { RouterLink } from '@angular/router'
@Component({
    selector: 'app-movie-card',
    standalone: true,
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss',
    imports: [FontAwesomeModule, CardModule, ButtonModule, RatingModule, FormsModule, PrefixUrlPipe, RouterLink]
})
export class MovieCardComponent implements OnInit {
    @Input() dataValue: Movie | undefined
    @Output() addFavoriteItemId = new EventEmitter<string>()
    @Output() addWishItemId = new EventEmitter<string>()
    public cardData: Movie | undefined
    public favoriteIcon = faStar
    public wishListIcon = faHeart
    public rating: number | undefined
    ngOnInit() {
        this.cardData = this.dataValue
    }

    addToFavoriteList(id: Number) {
        // this.addFavoriteItemId.emit(id)
    }

    addToWishList(id: Number) {
        // this.addWishItemId.emit(id)
    }
}
