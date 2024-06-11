import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class MovieCardComponent implements OnInit {
  @Input() dataValue: Movie | undefined;
  @Output() addFavoriteItemId = new EventEmitter<string>();
  @Output() addWishItemId = new EventEmitter<string>();
  //===========================================================
  public cardData: any;
  ngOnInit() {
    this.cardData = this.dataValue;
  }
  //===========================================================
  public favoriteIcon = faStar;
  public wishListIcon = faHeart;
  public ratingTitle: string = 'rating';
  //===========================================================
  addToFavoriteList(id: string) {
    this.addFavoriteItemId.emit(id);
  }
  addToWishList(id: string) {
    this.addWishItemId.emit(id);
  }
}
