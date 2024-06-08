import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
interface Movie {
  id: string;
  link: string;
  imgSrc: string;
  title: string;
  description: string;
  rating: number;
}
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() dataValue: undefined | Movie | any;
  @Output() addFavoriteItemId = new EventEmitter<string>();
  @Output() addWishItemId = new EventEmitter<string>();
  //===========================================================
  favoriteIcon = faStar;
  wishListIcon = faHeart;
  ratingTitle: string = 'rating';
  //===========================================================
  addToFavoriteList(id: string) {
    this.addFavoriteItemId.emit(id);
  }
  addToWishList(id: string) {
    this.addWishItemId.emit(id);
  }
}
