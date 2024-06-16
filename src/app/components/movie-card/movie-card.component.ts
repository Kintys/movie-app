import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../dataValues/dataMovie';
import { TimeMovieFormatPipe } from '../../pipes/time-movie-format/time-movie-format.pipe';
import { HiddenTextDirective } from '../../directives/hidden-text.directive';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  imports: [
    FontAwesomeModule,
    TimeMovieFormatPipe,
    HiddenTextDirective,
    CardModule,
    ButtonModule,
    RatingModule,
    FormsModule,
  ],
})
export class MovieCardComponent implements OnInit {
  @Input() dataValue: Movie | undefined;
  @Output() addFavoriteItemId = new EventEmitter<string>();
  @Output() addWishItemId = new EventEmitter<string>();
  public cardData: Movie | undefined;
  public favoriteIcon = faStar;
  public wishListIcon = faHeart;
  public rating: number | undefined;
  ngOnInit() {
    this.cardData = this.dataValue;
    this.rating = this.cardData?.rating;
  }

  addToFavoriteList(id: string) {
    this.addFavoriteItemId.emit(id);
  }

  addToWishList(id: string) {
    this.addWishItemId.emit(id);
  }
}
