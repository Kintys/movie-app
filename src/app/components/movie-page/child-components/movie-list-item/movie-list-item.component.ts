import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
interface Movie {
  id: string;
  link: string;
  imgSrc: string;
  title: string;
  description: string;
  rating: number;
}
@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss',
})
export class MovieListItemComponent {
  @Input() dataItem: Movie | undefined | any;
  @Output() itemId = new EventEmitter<string>();
  //===========================================================

  deleteIcon = faXmark;
  //===========================================================
  deleteItemById(id: string) {
    this.itemId.emit(id);
  }
}
