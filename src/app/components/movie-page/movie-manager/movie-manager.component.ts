import { Component } from '@angular/core';
import { movieList } from '../dataMovie';
import { MovieListItemComponent } from '../child-components/movie-list-item/movie-list-item.component';
import { MovieCardComponent } from '../child-components/movie-card/movie-card.component';
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
  imports: [MovieCardComponent, MovieListItemComponent],
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
    this.addItemToSomeList(id, this.movieList, this.favoriteList);
  }
  addItemToWishList(id: string) {
    this.addItemToSomeList(id, this.movieList, this.wishList);
  }
  deleteItemFromFavoriteList(id: string) {
    this.favoriteList = this.favoriteList.filter(
      (item: Movie) => item.id !== id
    );
  }
  deleteItemFromWishList(id: string) {
    this.wishList = this.wishList.filter((item: Movie) => item.id !== id);
  }
  addItemToSomeList(id: string, movieList: Movie[], newArr: any) {
    const foundObj = movieList.find((item: Movie) => item.id === id);
    const hasObj = newArr.some((item: Movie) => item.id === id);
    if (foundObj && !hasObj) newArr.push(foundObj);
    else return;
  }
}
