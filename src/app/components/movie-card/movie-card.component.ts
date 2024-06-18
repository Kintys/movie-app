import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../dataValues/dataMovie';
import { TimeMovieFormatPipe } from '../../pipes/time-movie-format/time-movie-format.pipe';
import { RatingSeparationPipe } from '../../pipes/rating-format/rating-separation.pipe';
import { TitleMaxLengthPipe } from '../../pipes/title-formater/title-max-length.pipe';
import { HiddenTextDirective } from '../../directives/hidden-text.directive';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  imports: [
    FontAwesomeModule,
    TimeMovieFormatPipe,
    RatingSeparationPipe,
    TitleMaxLengthPipe,
    HiddenTextDirective,
  ],
})
export class MovieCardComponent implements OnInit {
  @Input() dataValue: Movie | undefined;
  @Output() addFavoriteItemId = new EventEmitter<string>();
  @Output() addWishItemId = new EventEmitter<string>();
  public cardData: Movie | undefined;
  public favoriteIcon = faStar;
  public wishListIcon = faHeart;
  public ratingTitle: string = 'rating';

  ngOnInit() {
    this.cardData = this.dataValue;
  }

  addToFavoriteList(id: string) {
    this.addFavoriteItemId.emit(id);
  }

  addToWishList(id: string) {
    this.addWishItemId.emit(id);
  }
}
