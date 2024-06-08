import { Component } from '@angular/core';
import { movieList } from '../dataMovie';
import { CommonModule } from '@angular/common';
import { MovieListItemComponent } from '../child-components/movie-list-item/movie-list-item.component';
import { MovieCardComponent } from '../child-components/movie-card/movie-card.component';
import { v4 as uuidv4 } from 'uuid';
interface Movie {
  id: string;
  link: string;
  imgSrc: string;
  title: string;
  description: string;
  rating: number;
}
@Component({
  selector: 'app-movie-manager',
  standalone: true,
  imports: [MovieCardComponent, MovieListItemComponent, CommonModule],
  templateUrl: './movie-manager.component.html',
  styleUrl: './movie-manager.component.scss',
})
export class MovieManagerComponent {
  public movieList: Movie[] = movieList;
  public favoriteList: any = [];
  public wishList: any = [];
  //===========================================================
  public favoriteTitle: string = 'your favorite list';
  public wishListTitle: string = 'your wish list';
  //===========================================================
  addItemToFavoriteList(id: string) {
    const item: Movie | undefined = this.movieList.find(
      (item) => item.id === id
    );
    if (!item) return;
    else {
      this.favoriteList.push({
        ...item,
        id: uuidv4(),
      });
    }
  }
  addItemToWishList(id: string) {
    const item: Movie | undefined = this.movieList.find(
      (item) => item.id === id
    );
    if (!item) return;
    else {
      this.wishList.push({
        ...item,
        id: uuidv4(),
      });
    }
  }
  deleteItemFromFavoriteList(id: string) {
    this.favoriteList = this.favoriteList.filter(
      (item: Movie) => item.id !== id
    );
  }
  deleteItemFromWishList(id: string) {
    this.wishList = this.wishList.filter((item: Movie) => item.id !== id);
  }
}
